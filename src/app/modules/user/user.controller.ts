import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createPatient(req.body);

  sendResponse(res, { status: 201, success: true, message: "User created successfully", data: result });
});

export const UserController = { createPatient };
