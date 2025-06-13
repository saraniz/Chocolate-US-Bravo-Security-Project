import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { initRedis } from "./config/redis.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import createAdminRouter from "./routes/adminRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Initialize Redis
let redisClient, sessionStore, cacheMiddleware, invalidateCache;
try {
  const redis = await initRedis();
  redisClient = redis.client;
  sessionStore = redis.sessionStore;
  cacheMiddleware = redis.cacheMiddleware;
  invalidateCache = redis.invalidateCache;
} catch (error) {
  console.warn('Redis connection failed:', error.message);
}

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Session middleware
app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Create cache middleware instances with durations
const productCache = cacheMiddleware ? cacheMiddleware(300) : (req, res, next) => next(); // 5 minutes
const reviewCache = cacheMiddleware ? cacheMiddleware(300) : (req, res, next) => next(); // 5 minutes

// Apply caching to specific routes
app.use('/api/products', productCache);
app.use('/api/reviews', reviewCache);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Admin routes
app.use('/api/admin', createAdminRouter({ redisClient, sessionStore, invalidateCache }));

// Serve uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
