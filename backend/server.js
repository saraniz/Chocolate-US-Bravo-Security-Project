import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import orderRoutes from './routes/orderRoutes.js'; 

dotenv.config(); 

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS with specific options
const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Set-Cookie'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Handle preflight requests
app.options('*', cors(corsOptions));

// Apply CORS middleware
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
