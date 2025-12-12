import multer from "multer";
export declare const imageFileUploader: {
    upload: multer.Multer;
    uploadToCloudinary: (file: Express.Multer.File) => Promise<import("cloudinary").UploadApiResponse>;
};
//# sourceMappingURL=imageFileUploader.d.ts.map