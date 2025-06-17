import asyncHandler from '../middleware/asyncHandler.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
console.log('Uploads directory path:', uploadsDir);

if (!fs.existsSync(uploadsDir)) {
  console.log('Creating uploads directory...');
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Allowed file types
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
const maxFileSize = 5 * 1024 * 1024; // 5MB

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Saving file to:', uploadsDir);
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate a secure random filename
    const randomString = crypto.randomBytes(16).toString('hex');
    const timestamp = Date.now();
    const sanitizedOriginalName = path.basename(file.originalname).replace(/[^a-zA-Z0-9.]/g, '');
    const filename = `${timestamp}-${randomString}-${sanitizedOriginalName}`;
    console.log('Generated filename:', filename);
    cb(null, filename);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  console.log('Received file:', file.originalname, 'Mime type:', file.mimetype);
  
  if (!allowedMimeTypes.includes(file.mimetype)) {
    console.log('File rejected: invalid mime type');
    return cb(new Error('Only image files (JPEG, PNG, GIF) are allowed!'), false);
  }

  // Check file extension
  const ext = path.extname(file.originalname).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
    console.log('File rejected: invalid extension');
    return cb(new Error('Invalid file extension!'), false);
  }

  console.log('File accepted');
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: maxFileSize,
    files: 1 // Only allow one file per request
  }
}).single('image');

// @desc    Upload an image
// @route   POST /api/admin/upload
// @access  Private/Admin
const uploadImage = asyncHandler(async (req, res) => {
  console.log('Upload request received');
  console.log('Request headers:', req.headers);
  
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      console.error('Multer error:', err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size too large. Maximum size is 5MB.' });
      }
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // An unknown error occurred
      console.error('Upload error:', err);
      return res.status(500).json({ message: err.message });
    }

    // Everything went fine
    if (!req.file) {
      console.log('No file in request');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('File uploaded successfully:', req.file);
    
    // Generate a secure URL
    const baseUrl = process.env.BASE_URL || 'http://localhost:8000';
    const url = `${baseUrl}/uploads/${req.file.filename}`;
    
    console.log('Sending response:', { url });
    res.json({ url });
  });
});

// @desc    Upload a file
// @route   POST /api/upload
// @access  Private/Admin
const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload a file');
  }

  res.status(200).json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`
  });
});

// @desc    Get a file
// @route   GET /api/upload/:filename
// @access  Public
const getFile = asyncHandler(async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'uploads', filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404);
      throw new Error('File not found');
    }
  });
});

export { uploadImage, uploadFile, getFile }; 