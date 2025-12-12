import {NextFunction, Request, Response} from "express";
import catchAsync from "../../shared/catchAsync";
import {messageService} from "./message.service";
import sendResponse from "../../shared/sendResponse";

const createMessage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await messageService.createMessage(req.body);
    sendResponse(res, {status: 201, success: true, message: "Message create successfully", data: result});
  } catch (error) {
    next(error);
  }
});

const getMessages = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await messageService.getMessages();
    sendResponse(res, {status: 201, success: true, message: "Message create successfully", data: result});
  } catch (error) {
    next(error);
  }
});

export const messageController = {createMessage, getMessages};
