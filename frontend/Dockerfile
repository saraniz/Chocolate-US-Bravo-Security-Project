# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies)
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the application using Vite
RUN npm run build

# Production stage with NGINX
FROM nginx:alpine

# Install curl for health check
RUN apk add --no-cache curl

# Copy built static files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Create directory for custom error pages
RUN mkdir -p /usr/share/nginx/html/error

# Use same index.html for fallback error pages
COPY --from=builder /app/dist/index.html /usr/share/nginx/html/error/404.html
COPY --from=builder /app/dist/index.html /usr/share/nginx/html/error/500.html

# Set file permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose default HTTP port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Run NGINX
CMD ["nginx", "-g", "daemon off;"]
