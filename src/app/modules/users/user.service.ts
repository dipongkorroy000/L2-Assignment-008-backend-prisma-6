import config from "../../../config";

import {imageFileUploader} from "../../utils/imageFileUploader";
import bcryptjs from "bcryptjs";
import type {createAdminPayload, createGuidePayload, createTouristPayload} from "./user.interface";
import {pagination, type IPagination} from "../../middlewares/pagination";
import type {JwtPayload} from "jsonwebtoken";
import {Prisma, UserRole, UserStatus} from "@prisma/client";
import {prisma} from "../../shared/prisma";

const createTourist = async (payload: createTouristPayload) => {
  const hashPass = await bcryptjs.hash(payload.password, Number(config.BCRYPT_SALT_ROUND));

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({data: {email: payload.tourist.email, password: hashPass, role: UserRole.TOURIST}});

    return await tnx.tourist.create({data: payload.tourist});
  });

  return result;
};

const createGuide = async (payload: createGuidePayload) => {
  const hashPass = await bcryptjs.hash(payload.password, Number(config.BCRYPT_SALT_ROUND));

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({data: {email: payload.guide.email, password: hashPass, role: UserRole.GUIDE}});

    return await tnx.guide.create({data: payload.guide});
  });

  return result;
};

const createAdmin = async (payload: createAdminPayload) => {
  const hashPass = await bcryptjs.hash(payload.password, Number(config.BCRYPT_SALT_ROUND));

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({data: {email: payload.admin.email, password: hashPass, role: UserRole.ADMIN}});

    return await tnx.admin.create({data: payload.admin});
  });

  return result;
};

const getAllUsers = async (email: string, filters: any, options: IPagination) => {
  const {searchTerm, ...filterData} = filters;
  const {page, limit, skip, sortBy, sortOrder} = pagination(options);

  await prisma.user.findFirstOrThrow({where: {email, status: UserStatus.ACTIVE, role: UserRole.ADMIN}});

  const andConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({OR: ["email"].map((field) => ({[field]: {contains: searchTerm, mode: "insensitive"}}))});
  }

  if (Object.keys(filterData.length > 0)) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({[key]: {equals: (filterData as any)[key]}})),
    });
  }

  const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? {AND: andConditions} : {};

  const result = await prisma.user.findMany({
    skip: skip,
    take: limit,
    where: {AND: whereConditions},

    orderBy: sortOrder && sortBy ? {[sortBy]: sortOrder} : {createdAt: "desc"},

    select: {id: true, email: true, role: true, status: true, createdAt: true},
  });

  const total = await prisma.user.count({where: {AND: andConditions}});

  return {meta: {page, limit, total}, data: result};
};

const updateProfile = async (token: JwtPayload, payload: any, file: Express.Multer.File | undefined) => {
  const userInfo = await prisma.user.findUniqueOrThrow({where: {email: token?.email, status: UserStatus.ACTIVE}});

  if (file) {
    const uploadToCloudinary = await imageFileUploader.uploadToCloudinary(file);
    payload.profilePhoto = uploadToCloudinary?.secure_url;
  }

  let profileInfo;

  if (userInfo.role === UserRole.ADMIN) {
    const {languages, ...data} = payload;
    profileInfo = await prisma.admin.update({where: {email: userInfo.email}, data: data});
  } else if (userInfo.role === UserRole.GUIDE) {
    const guideProfile = await prisma.guide.findUniqueOrThrow({where: {email: userInfo.email}});

    // ✅ Merge new language into existing array
    if (payload.languages) {
      const existingLanguages = guideProfile.languages || [];
      const newLanguages = Array.isArray(payload.languages) ? payload.languages : [payload.languages];

      const mergedLanguages = Array.from(new Set([...existingLanguages, ...newLanguages]));
      payload.languages = mergedLanguages;
    }

    profileInfo = await prisma.guide.update({where: {email: userInfo.email}, data: payload});
  } else if (userInfo.role === UserRole.TOURIST) {
    const touristProfile = await prisma.tourist.findUniqueOrThrow({where: {email: userInfo.email}});

    if (payload.languages) {
      const existingLanguages = touristProfile.languages || [];
      const newLanguages = Array.isArray(payload.languages) ? payload.languages : [payload.languages];

      payload.languages = Array.from(new Set([...existingLanguages, ...newLanguages]));
    }

    profileInfo = await prisma.tourist.update({where: {email: userInfo.email}, data: payload});
  }

  return {...profileInfo};
};

const updateProfileStatus = async (id: number, payload: {status: UserStatus}) => {
  await prisma.user.findUniqueOrThrow({where: {id}});

  return await prisma.user.update({where: {id}, data: {status: payload.status}});
};

const getUser = async (id: number) => {
  const user = await prisma.user.findUniqueOrThrow({where: {id}});
  if (user.role === UserRole.ADMIN) return await prisma.admin.findUniqueOrThrow({where: {email: user.email}});
  else if (user.role === UserRole.GUIDE) return await prisma.guide.findUniqueOrThrow({where: {email: user.email}});
  else if (user.role === UserRole.TOURIST) return await prisma.tourist.findUniqueOrThrow({where: {email: user.email}});
};

export const userService = {createTourist, createGuide, createAdmin, getAllUsers, updateProfile, updateProfileStatus, getUser};
