"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const ServerError_1 = __importDefault(require("../errors/ServerError"));
const multer_1 = __importDefault(require("multer")); // ✅ import MulterError
const client_1 = require("@prisma/client");
const globalErrorHandler = (err, req, res, next) => {
    let status = http_status_1.default.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = "Something went wrong!";
    let error = err;
    // ✅ Handle Multer file size error
    if (err instanceof multer_1.default.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            status = http_status_1.default.BAD_REQUEST;
            message = "Image file size must be below 400KB";
            error = {
                field: err.field,
                code: err.code,
                message: err.message,
            };
        }
        else {
            status = http_status_1.default.BAD_REQUEST;
            message = "File upload error";
            error = err.message;
        }
    }
    // ✅ Handle custom ServerError
    else if (err instanceof ServerError_1.default) {
        status = err.status;
        message = err.message;
        error = process.env.NODE_ENV === "development" ? err.stack : undefined;
    }
    // ✅ Handle Prisma Known Errors
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                status = http_status_1.default.CONFLICT;
                message = "Duplicate key error";
                error = err.meta;
                break;
            case "P1000":
                status = http_status_1.default.BAD_GATEWAY;
                message = "Authentication failed against database server";
                error = err.meta;
                break;
            case "P2003":
                status = http_status_1.default.BAD_REQUEST;
                message = "Foreign key constraint failed";
                error = err.meta;
                break;
            case "P2025":
                status = http_status_1.default.NOT_FOUND;
                message = "An operation failed because it depends on one or more records that were required but not found";
                error = err.meta;
                break;
            default:
                status = http_status_1.default.BAD_REQUEST;
                message = "Prisma known request error";
                error = err.message;
        }
    }
    // ✅ Handle Prisma Validation Error
    else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        status = http_status_1.default.BAD_REQUEST;
        message = "Validation error";
        error = err.message;
    }
    // ✅ Handle Prisma Unknown Error
    else if (err instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
        status = http_status_1.default.BAD_REQUEST;
        message = "Unknown prisma error occurred";
        error = err.message;
    }
    // ✅ Handle Prisma Initialization Error
    else if (err instanceof client_1.Prisma.PrismaClientInitializationError) {
        status = http_status_1.default.BAD_REQUEST;
        message = "Prisma client failed to initialize!";
        error = err.message;
    }
    // ✅ Final response
    res.status(status).json({
        success,
        message,
        error,
    });
};
exports.default = globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map