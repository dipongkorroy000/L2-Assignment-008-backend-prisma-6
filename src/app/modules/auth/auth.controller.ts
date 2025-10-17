import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../shared/sendResponse";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  const { accessToken, refreshToken, needPasswordChange } = result;

  res.cookie("accessToken", accessToken, { secure: true, httpOnly: true, sameSite: "none", maxAge: 1000 * 60 * 60 });
  res.cookie("refreshToken", accessToken, { secure: true, httpOnly: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 30 });

  sendResponse(res, { status: 200, success: true, message: "Login Successfully", data: { needPasswordChange } });
});

export const AuthController = { login };
