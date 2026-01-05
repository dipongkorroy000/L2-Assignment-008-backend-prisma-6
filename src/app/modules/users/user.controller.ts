import type {NextFunction, Request, Response} from "express";
import catchAsync from "../../shared/catchAsync";
import {userService} from "./user.service";
import sendResponse from "../../shared/sendResponse";
import formateObject from "../../middlewares/formateObject";
import type {JwtPayload} from "jsonwebtoken";
import status from "http-status";

const createTourist = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.createTourist(req.body);

    sendResponse(res, {status: status.CREATED, success: true, message: "Profile created successfully", data: result});
  } catch (error) {
    next(error);
  }
});

const createGuide = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.createGuide(req.body);
    sendResponse(res, {status: status.CREATED, success: true, message: "Profile created successfully", data: result});
  } catch (error) {
    next(error);
  }
});

const createAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.createAdmin(req.body);

    sendResponse(res, {status: status.CREATED, success: true, message: "Profile created successfully", data: result});
  } catch (error) {
    next(error);
  }
});

const getAllUsers = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response, next: NextFunction) => {
  const {email} = req.token as JwtPayload;
  const filters = formateObject(req.query, ["status", "role", "email", "searchTerm"]);
  const options = formateObject(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  try {
    const result = await userService.getAllUsers(email, filters, options);
    sendResponse(res, {status: status.OK, success: true, message: "Users retrieved successfully", data: result});
  } catch (error) {
    next(error);
  }
});

const updateProfile = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response, next: NextFunction) => {
  try {
    const result = await userService.updateProfile(req.token as JwtPayload, req.body, req.file);

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: "Profile updated successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

const updateProfileStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const result = await userService.updateProfileStatus(Number(id), req.body);

    sendResponse(res, {status: status.OK, success: true, message: "Users profile status changed!", data: result});
  } catch (error) {
    next(error);
  }
});

const getUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getUser(Number(req.params.id));

    sendResponse(res, {status: status.OK, success: true, message: "User retrieved successfully", data: result});
  } catch (error) {
    next(error);
  }
});

const guidesLanguages = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.guidesLanguages();

    sendResponse(res, {status: status.OK, success: true, message: "Guides languages retrieved successfully", data: result});
  } catch (error) {
    next(error);
  }
});

const getGuides = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const filters = formateObject(req.query, ["language", "categoryId", "searchTerm"]);
  const options = formateObject(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  try {
    const result = await userService.getGuides(filters, options);

    sendResponse(res, {status: status.OK, success: true, message: "Guides retrieved successfully", data: result});
  } catch (error) {
    next(error);
  }
});

export const userController = {
  createTourist,
  createGuide,
  createAdmin,
  getAllUsers,
  updateProfile,
  updateProfileStatus,
  getUser,
  guidesLanguages,
  getGuides,
};
