import type {NextFunction, Request, Response} from "express";
import catchAsync from "../../shared/catchAsync";
import {authService} from "./auth.service";
import config from "../../../config";
import sendResponse from "../../shared/sendResponse";
import tokenDateValidate from "../../utils/tokenMaxAge";
import status from "http-status";
import type {JwtPayload} from "jsonwebtoken";

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.login(req.body);

    const {accessToken, refreshToken} = result;

    const accessTokenExpiresIn = config.JWT.ACCESS_TOKEN_EXPIRES_IN;
    const refreshTokenExpiresIn = config.JWT.REFRESH_TOKEN_EXPIRES_IN;

    const tokenAge = tokenDateValidate({accessTokenExpiresIn, refreshTokenExpiresIn});

    res.cookie("accessToken", accessToken, {secure: true, httpOnly: true, sameSite: "none", maxAge: tokenAge.accessTokenMaxAge});
    res.cookie("refreshToken", refreshToken, {secure: true, httpOnly: true, sameSite: "none", maxAge: tokenAge.refreshTokenMaxAge});

    sendResponse(res, {status: 200, success: true, message: "Login Successfully", data: null});
  } catch (error) {
    next(error);
  }
});

const getProfile = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response) => {
  const email = req.token?.email;

  const result = await authService.getProfile(email);

  sendResponse(res, {status: status.OK, success: true, message: "User retrieve successfully!", data: result});
});

const passwordUpdate = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response, next: NextFunction) => {
  try {
    const result = await authService.passwordUpdate(req.token?.email as string, req.body);
    sendResponse(res, {status: status.OK, success: true, message: "Update successfully!", data: result});
  } catch (error) {
    next(error);
  }
});

export const authController = {login, getProfile, passwordUpdate};
