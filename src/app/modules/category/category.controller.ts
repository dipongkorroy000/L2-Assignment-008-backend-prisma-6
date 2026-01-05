import type {Request, Response} from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import status from "http-status";
import {categoryService} from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.createCategory(req.body);

  sendResponse(res, {status: status.OK, success: true, message: "Created category", data: result});
});

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategory();

  sendResponse(res, {status: status.OK, success: true, message: "Created category", data: result});
});

const getAllCategoryWithTours = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategoryWithTours();

  sendResponse(res, {status: status.OK, success: true, message: "Created category", data: result});
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.deleteCategory(Number(req.params.id));

  sendResponse(res, {status: status.OK, success: true, message: "Created category", data: result});
});

export const categoryController = {createCategory, getAllCategory, getAllCategoryWithTours, deleteCategory};
