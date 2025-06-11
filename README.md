# Chocolate Bravo

A full-stack web application with a React frontend and Node.js backend.

## Project Structure

```
chocolate-bravo/
├── frontend/          # React frontend application
├── backend/           # Node.js backend server
└── README.md         # Project documentation
```

## Prerequisites

- Node.js (v18.x LTS recommended)
- npm (comes with Node.js)
- Git

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

   > **Note:** If you encounter any issues with Node.js version compatibility, please ensure you're using Node.js v18.x LTS. The project may not work correctly with Node.js v24+ due to compatibility issues with some packages (particularly bcrypt).

3. Create a `.env` file in the backend directory with your environment variables:
   ```env
   PORT=5000
   # Add other environment variables as needed
   ```

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
   npm start
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