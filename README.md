# Chocolate Bravo 🍫  
A full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js) featuring Docker-based local development and production-ready Kubernetes deployment.

---

## 🧩 Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: MongoDB (commented out for now, ready for integration)
- **Cache**: Redis
- **Web Server**: NGINX
- **Containerization**: Docker + Docker Compose
- **Orchestration**: Kubernetes + Kustomize
- **CI/CD Ready**: Designed for GitHub Actions, Helm, and Ingress setups

## Project Structure

```
chocolate-bravo/
├── frontend/          # React frontend application
├── backend/           # Node.js backend server
├── k8s/               # Kubernetes manifests
├── nginx/             # Nginx config for reverse proxy
├── ssl/               # SSL certificates (if used)
└── README.md          # Project documentation
```

## Prerequisites

- Node.js (v18.x LTS recommended)
- npm (comes with Node.js)
- Git
- Docker (for containerization)
- Kubernetes (for orchestration, e.g., minikube, kind, or a cloud provider)

## Environment Variables

This project uses separate environment files for the backend and frontend, but all documentation is provided here for convenience.

### Backend Environment Variables (`backend/.env`)
Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=8000

# MongoDB Configuration
MONGO_URI=


# JWT Configuration
JWT_SECRET =
JWT_EXPIRES_IN=24h

# Redis Configuration
REDIS_HOST=127.0.0.1 # change this to 'redis' if using docker
REDIS_PORT=6379
REDIS_PASSWORD=

# File Upload Configuration
UPLOAD_PATH=/app/uploads
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
CORS_CREDENTIALS=true
CORS_METHODS=GET,POST,PUT,DELETE,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization,X-Requested-With,Accept
CORS_EXPOSED_HEADERS=Set-Cookie

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

- The backend `.env` contains all sensitive server, database, Redis, JWT, and Cloudinary variables. These should never be shared with the frontend.

### Frontend Environment Variables (`frontend/.env`)
Create a `.env` file in the `frontend` directory for Vite environment variables. For example:

```env
# API Configuration
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=

# Authentication
VITE_JWT_EXPIRES_IN=24h

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=false

# Upload Configuration
VITE_MAX_FILE_SIZE=5242880
VITE_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif

# Environment
NODE_ENV=development
```

- `VITE_API_URL`: The base URL for the backend API. This is used in the frontend to make API requests. All Vite environment variables must be prefixed with `VITE_` to be accessible in the React app via `import.meta.env`.
- Only variables prefixed with `VITE_` are accessible in the frontend React app.

**Note:**
- The backend and frontend each require their own `.env` files, but all configuration is documented here for clarity.

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file as described above.
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Docker Usage

To run the app with Docker Compose:

```bash
docker-compose up --build
```

- Make sure to set up your `.env` file in the backend directory before building.
- The `docker-compose.yml` file will set up the backend, frontend, Redis, and MongoDB containers.

## Kubernetes Usage

Kubernetes manifests are in the `k8s/` directory. To deploy:

```bash
kubectl apply -k k8s/
```

- You may need to create Kubernetes secrets/configmaps for environment variables.
- The manifests cover backend, frontend, Redis, Nginx, and ingress.

## Redis Setup

- Redis is used for session storage and caching.
- You can run Redis locally, via Docker, or in Kubernetes.
- Configure `REDIS_HOST`, `REDIS_PORT`, and `REDIS_PASSWORD` in your `.env` file.

## Cloudinary Setup

- For production, set up a Cloudinary account and fill in the `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` in your `.env` file.
- For local development, you can use local uploads (see `BASE_URL`).

## Backend Utility Scripts

In `backend/scripts/`:
- `install-redis.sh`: Script to install Redis locally (Linux/Mac).
- `initDB.js`: Initialize the database with seed data.
- `createAdmin.js`: Create an admin user.
- `checkDb.js`: Check MongoDB connection.

Run with:
```bash
node scripts/initDB.js
node scripts/createAdmin.js
```

## Node.js Version Compatibility

### Known Issues

The project has been tested and works best with Node.js v18.x LTS. Using Node.js v24+ may cause compatibility issues, particularly with the `bcrypt` package.

### Troubleshooting Node.js Version Issues

If you encounter errors during `npm install` in the backend directory, particularly related to `bcrypt` or `semver`, follow these steps:

1. Check your Node.js version:
   ```bash
   node -v
   ```
2. If you're using Node.js v24+, switch to v18.x LTS using nvm:
   ```bash
   nvm install 18
   nvm use 18
   ```
3. Clean the npm cache and node_modules:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   ```
4. Reinstall dependencies:
   ```bash
   npm install
   ```

## File Uploads

- The application handles file uploads (like product images) in the `backend/uploads` directory (created automatically on first upload).
- For production, use a file storage service (e.g., AWS S3, Google Cloud Storage, or Cloudinary) and configure the appropriate environment variables.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for their invaluable tools and libraries 