import type {NextFunction, Request, Response} from "express";
import catchAsync from "../../shared/catchAsync";
import {requestedTourService} from "./requested-tour.service";
import type {JwtPayload} from "jsonwebtoken";
import sendResponse from "../../shared/sendResponse";
import status from "http-status";

const requestTour = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response, next: NextFunction) => {
  try {
    const token = req.token as JwtPayload;
    const result = await requestedTourService.requestTour(token.email as string, req.body);

    sendResponse(res, {status: status.OK, success: true, message: "Tours Requested Successfully", data: result});
  } catch (error) {
    next(error);
  }
});

const getRequestedTourForm = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response, next: NextFunction) => {
  const {email} = req.token as JwtPayload;
  try {
    const result = await requestedTourService.getRequestedTourForm(email);

    sendResponse(res, {status: status.OK, success: true, message: "ToursForm retrieved successfully", data: result});
  } catch (error) {
    next(error);
  }
});

const updateRequestedTourFormStatus = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response, next: NextFunction) => {
  const {email} = req.token as JwtPayload;

  try {
    const result = await requestedTourService.updateRequestedTourFormStatus(email as string, Number(req.params.id), req.body);

    sendResponse(res, {status: status.OK, success: true, message: "ToursForm updated successfully", data: result});
  } catch (error) {
    next(error);
  }
});

const upcomingTours = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response, next: NextFunction) => {
  const {email} = req.token as JwtPayload;

  try {
    const result = await requestedTourService.upcomingTours(email as string);

    sendResponse(res, {status: status.OK, success: true, message: "Upcoming tours retrieved successfully", data: result});
  } catch (error) {
    next(error);
  }
});

const canceledRequestedTours = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response, next: NextFunction) => {
  const {email} = req.token as JwtPayload;
  try {
    const result = await requestedTourService.canceledRequestedTours(email);

    sendResponse(res, {status: status.OK, success: true, message: "ToursForm retrieved successfully", data: result});
  } catch (error) {
    next(error);
  }
});

const completedRequestedTours = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response, next: NextFunction) => {
  const {email} = req.token as JwtPayload;
  try {
    const result = await requestedTourService.completedRequestedTours(email);

    sendResponse(res, {status: status.OK, success: true, message: "ToursForm retrieved successfully", data: result});
  } catch (error) {
    next(error);
  }
});

const completedToursReviewProvide = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response, next: NextFunction) => {
  const {email} = req.token as JwtPayload;
  try {
    const result = await requestedTourService.completedToursReviewProvide(email);

    sendResponse(res, {status: status.OK, success: true, message: "ToursForm retrieved successfully", data: result});
  } catch (error) {
    next(error);
  }
});

export const requestedTourController = {
  requestTour,
  getRequestedTourForm,
  updateRequestedTourFormStatus,
  upcomingTours,
  canceledRequestedTours,
  completedRequestedTours,
  completedToursReviewProvide
};