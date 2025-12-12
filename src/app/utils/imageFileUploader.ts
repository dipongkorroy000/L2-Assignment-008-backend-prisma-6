import multer from "multer";
import path from "path";
import {v2 as cloudinary} from "cloudinary";
import config from "../../config";

const MAX_SIZE = 400 * 1024; // 400 KB in bytes

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({
  storage,
  limits: {fileSize: MAX_SIZE}, // ✅ enforce max size
  fileFilter: (req, file, cb) => {
    if (file.size > MAX_SIZE) {
      return cb(new Error("File size must be below 400KB"));
    }
    cb(null, true);
  },
});

const uploadToCloudinary = async (file: Express.Multer.File) => {
  cloudinary.config({
    cloud_name: config.CLOUDINARY.CLOUD_NAME,
    api_key: config.CLOUDINARY.API_KEY,
    api_secret: config.CLOUDINARY.API_SECRET,
  });

  const uploadResult = await cloudinary.uploader.upload(file.path, {public_id: file.filename}).catch((error) => {
    console.error(error);
    throw new Error("Cloudinary upload failed");
  });

  return uploadResult;
};

export const imageFileUploader = {upload, uploadToCloudinary};