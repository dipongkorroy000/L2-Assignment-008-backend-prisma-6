import type {Request, Response} from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import {reviewsService} from "./review.service";
import type {JwtPayload} from "jsonwebtoken";

const getReviews = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response) => {
  const {email} = req.token as JwtPayload;
  const result = await reviewsService.getReviews(email);
  sendResponse(res, {status: 200, success: true, message: "Reviews retrieved successfully", data: result});
});

const createReview = catchAsync(async (req: Request, res: Response) => {

  const result = await reviewsService.createReview(Number(req.params.id), req.body);
  sendResponse(res, {status: 200, success: true, message: "Reviews retrieved successfully", data: result});
});

export const reviewsController = {getReviews, createReview};