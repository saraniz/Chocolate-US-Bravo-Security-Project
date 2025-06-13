# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Production stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy application files from builder stage
COPY --from=builder /app/controllers ./controllers
COPY --from=builder /app/models ./models
COPY --from=builder /app/routes ./routes
COPY --from=builder /app/middleware ./middleware
COPY --from=builder /app/utils ./utils
COPY --from=builder /app/config ./config
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/server.js ./
COPY --from=builder /app/initDB.js ./

# Create uploads directory with proper permissions
RUN mkdir -p uploads && \
    chown -R node:node uploads && \
    chmod 755 uploads

# Set environment variables
ENV NODE_ENV=production \
    PORT=8000 \
    NODE_OPTIONS="--max-old-space-size=512" \
    MONGODB_URI="mongodb://mongodb:27017/chocolate_bravo" \
    JWT_SECRET="change-this-in-production" \
    FRONTEND_URL="http://localhost" \
    UPLOAD_PATH="/app/uploads" \
    REDIS_URL="redis://redis:6379" \
    RATE_LIMIT_WINDOW_MS=900000 \
    RATE_LIMIT_MAX_REQUESTS=100 \
    JWT_EXPIRES_IN="24h" \
    COOKIE_SECRET="change-this-in-production" \
    MAX_FILE_SIZE=5242880 \
    ALLOWED_FILE_TYPES="image/jpeg,image/png,image/gif" \
    CORS_ORIGIN="http://localhost" \
    CORS_CREDENTIALS=true \
    CORS_METHODS="GET,POST,PUT,DELETE,OPTIONS" \
    CORS_ALLOWED_HEADERS="Content-Type,Authorization,X-Requested-With,Accept" \
    CORS_EXPOSED_HEADERS="Set-Cookie"

# Switch to non-root user
USER node

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8000/api/health || exit 1

# Start the application
CMD ["node", "server.js"] 