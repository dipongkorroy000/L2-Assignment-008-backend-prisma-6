import type {Login, PasswordPayload} from "./auth.interface";
import status from "http-status";
import bcryptjs from "bcryptjs";
import {jsonwebtoken} from "../../utils/jsonwebtoken";
import config from "../../../config";
import ServerError from "../../errors/ServerError";
import {prisma} from "../../shared/prisma";
import {UserStatus} from "@prisma/client";

const login = async (payload: Login) => {
  const user = await prisma.user.findUnique({where: {email: payload.email}});

  if (!user) throw new ServerError(status.NOT_FOUND, "User not found");

  if (user.status == UserStatus.BANNED) throw new ServerError(status.FORBIDDEN, "Banned account");

  const isCorrectPass = await bcryptjs.compare(payload.password, user.password);

  if (!isCorrectPass) throw new ServerError(status.BAD_REQUEST, "Password is incorrect");

  const accessToken = await jsonwebtoken.generateToken({
    email: user.email,
    role: user.role,
    secret: config.JWT.ACCESS_TOKEN_SECRET,
    expiresIn: config.JWT.ACCESS_TOKEN_EXPIRES_IN,
  });

  const refreshToken = await jsonwebtoken.generateToken({
    email: user.email,
    role: user.role,
    secret: config.JWT.REFRESH_TOKEN_SECRET,
    expiresIn: config.JWT.REFRESH_TOKEN_EXPIRES_IN,
  });

  return {accessToken, refreshToken};
};

const getProfile = async (email: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {email: email},
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      admin: {
        select: {
          id: true,
          name: true,
          email: true,
          profilePhoto: true,
          contactNumber: true,
          address: true,
          gender: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      guide: {
        select: {
          id: true,
          name: true,
          email: true,
          profilePhoto: true,
          contactNumber: true,
          address: true,
          gender: true,
          languages: true,
          averageRating: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      tourist: {
        select: {
          id: true,
          name: true,
          email: true,
          profilePhoto: true,
          address: true,
          gender: true,
          contactNumber: true,
          languages: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  if (user.status == UserStatus.BANNED) throw new ServerError(status.FORBIDDEN, "User is banned");

  return user;
};

const passwordUpdate = async (email: string, payload: PasswordPayload) => {
  const user = await prisma.user.findUniqueOrThrow({where: {email, status: UserStatus.ACTIVE}});

  const isCorrectPass = await bcryptjs.compare(payload.oldPassword, user.password);
  if (!isCorrectPass) throw new ServerError(status.BAD_REQUEST, "Password is incorrect");

  const hashedPassword = await bcryptjs.hash(payload.newPassword, Number(config.BCRYPT_SALT_ROUND));

  const result = await prisma.user.update({where: {email}, data: {password: hashedPassword}});

  return result;
};

export const userProfileStatusUpdate = async (email: string) => {
  const user = await prisma.user.findUniqueOrThrow({where: {email}});

  if (user.status === UserStatus.BANNED) {
    throw new ServerError(status.FORBIDDEN, "Banned users cannot be updated");
  }

  const newStatus = user.status === UserStatus.ACTIVE ? UserStatus.INACTIVE : UserStatus.ACTIVE;

  const result = await prisma.user.update({where: {email}, data: {status: newStatus}});

  return {success: true, message: `Status changed to ${newStatus}`, user: result};
};

export const authService = {login, getProfile, passwordUpdate, userProfileStatusUpdate};
