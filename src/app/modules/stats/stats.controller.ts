import type {JwtPayload} from "jsonwebtoken";
import catchAsync from "../../shared/catchAsync";
import type {NextFunction, Request, Response} from "express";
import sendResponse from "../../shared/sendResponse";
import status from "http-status";
import { statsService } from "./stats.service";

const adminStats = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response, next: NextFunction) => {
  const {email} = req.token as JwtPayload;

  try {
    const result = await statsService.adminStats(email);
    sendResponse(res, {status: status.OK, success: true, message: "Stats retrieved successfully", data: result});
  } catch (error) {
    next(error);
  }
});

const guideStats = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response, next: NextFunction) => {
  const {email} = req.token as JwtPayload;

  try {
    const result = await statsService.guideStats(email);
    sendResponse(res, {status: status.OK, success: true, message: "Stats retrieved successfully", data: result});
  } catch (error) {
    next(error);
  }
});

export const statsController = {adminStats , guideStats};