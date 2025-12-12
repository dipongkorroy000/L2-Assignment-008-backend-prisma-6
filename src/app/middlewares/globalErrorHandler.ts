import type {NextFunction, Request, Response} from "express";
import httpStatus from "http-status";
import ServerError from "../errors/ServerError";
import multer from "multer"; // ✅ import MulterError
import {Prisma} from "@prisma/client";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let status: number = httpStatus.INTERNAL_SERVER_ERROR;
  let success = false;
  let message: string = "Something went wrong!";
  let error: any = err;

  // ✅ Handle Multer file size error
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      status = httpStatus.BAD_REQUEST;
      message = "Image file size must be below 400KB";
      error = {
        field: err.field,
        code: err.code,
        message: err.message,
      };
    } else {
      status = httpStatus.BAD_REQUEST;
      message = "File upload error";
      error = err.message;
    }
  }

  // ✅ Handle custom ServerError
  else if (err instanceof ServerError) {
    status = err.status;
    message = err.message;
    error = process.env.NODE_ENV === "development" ? err.stack : undefined;
  }

  // ✅ Handle Prisma Known Errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        status = httpStatus.CONFLICT;
        message = "Duplicate key error";
        error = err.meta;
        break;
      case "P1000":
        status = httpStatus.BAD_GATEWAY;
        message = "Authentication failed against database server";
        error = err.meta;
        break;
      case "P2003":
        status = httpStatus.BAD_REQUEST;
        message = "Foreign key constraint failed";
        error = err.meta;
        break;
      case "P2025":
        status = httpStatus.NOT_FOUND;
        message = "An operation failed because it depends on one or more records that were required but not found";
        error = err.meta;
        break;
      default:
        status = httpStatus.BAD_REQUEST;
        message = "Prisma known request error";
        error = err.message;
    }
  }

  // ✅ Handle Prisma Validation Error
  else if (err instanceof Prisma.PrismaClientValidationError) {
    status = httpStatus.BAD_REQUEST;
    message = "Validation error";
    error = err.message;
  }

  // ✅ Handle Prisma Unknown Error
  else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    status = httpStatus.BAD_REQUEST;
    message = "Unknown prisma error occurred";
    error = err.message;
  }

  // ✅ Handle Prisma Initialization Error
  else if (err instanceof Prisma.PrismaClientInitializationError) {
    status = httpStatus.BAD_REQUEST;
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

export default globalErrorHandler;
