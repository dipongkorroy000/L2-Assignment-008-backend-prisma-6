"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFileUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("../../config"));
const MAX_SIZE = 400 * 1024; // 400 KB in bytes
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(process.cwd(), "/uploads"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: MAX_SIZE }, // ✅ enforce max size
    fileFilter: (req, file, cb) => {
        if (file.size > MAX_SIZE) {
            return cb(new Error("File size must be below 400KB"));
        }
        cb(null, true);
    },
});
const uploadToCloudinary = async (file) => {
    cloudinary_1.v2.config({
        cloud_name: config_1.default.CLOUDINARY.CLOUD_NAME,
        api_key: config_1.default.CLOUDINARY.API_KEY,
        api_secret: config_1.default.CLOUDINARY.API_SECRET,
    });
    const uploadResult = await cloudinary_1.v2.uploader.upload(file.path, { public_id: file.filename }).catch((error) => {
        console.error(error);
        throw new Error("Cloudinary upload failed");
    });
    return uploadResult;
};
exports.imageFileUploader = { upload, uploadToCloudinary };
//# sourceMappingURL=imageFileUploader.js.map