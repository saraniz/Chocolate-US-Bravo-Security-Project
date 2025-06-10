import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload file to Cloudinary
export const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'chocolate-bravo',
      use_filename: true,
      unique_filename: true,
    });

    // Remove the file from local storage after upload
    fs.unlinkSync(filePath);

    return result;
  } catch (error) {
    // Remove the file from local storage in case of error
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
}; 