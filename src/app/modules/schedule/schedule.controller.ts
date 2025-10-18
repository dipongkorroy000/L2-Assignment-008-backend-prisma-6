import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ScheduleService } from "./schedule.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await ScheduleService.insertIntoDB(payload);

  sendResponse(res, {
    status: 201,
    success: true,
    message: "Schedule created successfully!",
    data: result,
  });
});

const schedulesForDoctor = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Schedule created successfully!",
    data: "",
  });
});

const deleteScheduleFromDB = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Schedule created successfully!",
    data: "",
  });
});

export const ScheduleController = {
  insertIntoDB,
  schedulesForDoctor,
  deleteScheduleFromDB,
};
