import type {NextFunction, Request, Response} from "express";
import catchAsync from "../../shared/catchAsync";
import {tourService} from "./tour.service";
import type {JwtPayload} from "jsonwebtoken";
import sendResponse from "../../shared/sendResponse";
import status from "http-status";
import formateObject from "../../middlewares/formateObject";


const createTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await tourService.createTour(req.params.email as string, req.body, req.file);

    sendResponse(res, {status: status.OK, success: true, message: "Tour Created Successfully", data: result});
  } catch (error) {
    console.log(error);
    next(error);
  }
});

const getAllTours = catchAsync(async (req: Request, res: Response) => {
  const filters = formateObject(req.query, ["city", "duration", "categoryId", "searchTerm"]);
  const options = formateObject(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  try {
    const result = await tourService.getAllTours(filters, options);

    sendResponse(res, {status: status.OK, success: true, message: "Tours Retrieved Successfully", data: result});
  } catch (error) {
    console.log(error);
  }
});

const getTourById = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await tourService.getTourById(Number(req.params.id));

    sendResponse(res, {status: status.OK, success: true, message: "Tour Retrieved Successfully", data: result});
  } catch (error) {
    console.log(error);
  }
});

const getToursByGuide = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response) => {
  const filters = formateObject(req.query, ["city", "duration", "category", "searchTerm"]);
  const options = formateObject(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  try {
    const result = await tourService.getToursByGuide(filters, options, req.token?.email as string);

    sendResponse(res, {status: status.OK, success: true, message: "Tours Retrieved Successfully", data: result});
  } catch (error) {
    console.log(error);
  }
});

const updateTourByGuide = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response) => {
   const {email} = req.token as JwtPayload;
  try {
    const result = await tourService.updateTourByGuide(email, Number(req.params.id), req.body);

    sendResponse(res, {status: status.OK, success: true, message: "Tour Updated Successfully", data: result});
  } catch (error) {
    console.log(error);
  }
});

const updateTourStatusByGuide = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response) => {
   const {email} = req.token as JwtPayload;
  try {
    const result = await tourService.updateTourStatusByGuide(email, Number(req.params.id));

    sendResponse(res, {status: status.OK, success: true, message: "Tour Status Updated Successfully", data: result});
  } catch (error) {
    console.log(error);
  }
});

const deleteTour = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response) => {
  const {email} = req.token as JwtPayload;
  try {
    const result = await tourService.deleteTour(email, Number(req.params.id));

    sendResponse(res, {status: status.OK, success: true, message: "Tour Deleted Successfully", data: result});
  } catch (error) {
    console.log(error);
  }
});

export const tourController = {createTour, getAllTours, getTourById, getToursByGuide, updateTourByGuide, updateTourStatusByGuide, deleteTour};