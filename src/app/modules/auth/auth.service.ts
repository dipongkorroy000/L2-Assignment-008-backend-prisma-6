import { UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import { Login } from "./auth.interface";
import bcryptjs from "bcryptjs";
import config from "../../../config";
import { jwtHelper } from "../../helper/genarateToken";

const login = async (payload: Login) => {
  const user = await prisma.user.findUnique({ where: { email: payload.email, status: UserStatus.ACTIVE } });

  if (!user) throw new Error("User not found");

  const isCorrectPass = await bcryptjs.compare(payload.password, user.password);

  if (!isCorrectPass) throw new Error("Password is incorrect");

  const accessToken = await jwtHelper.generateToken({ email: user.email, role: user.role, secret: config.jwt_access_secret_key, expireIn: "1d" });
  const refreshToken = await jwtHelper.generateToken({ email: user.email, role: user.role, secret: config.jwt_refresh_secret_key, expireIn: "30d" });

  return { accessToken, refreshToken, needPasswordChange: user.needPasswordChange };
};

export const AuthService = { login };
