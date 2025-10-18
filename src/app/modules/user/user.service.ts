import { Prisma } from "@prisma/client";
import { fileUploader } from "../../helper/fileUploader";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { prisma } from "../../shared/prisma";
import { createPatientInput } from "./user.interface";
import bcryptjs from "bcryptjs";

const createPatient = async (payload: createPatientInput, file: Express.Multer.File | undefined) => {
  if (file) {
    const uploadResult = await fileUploader.uploadToCloudinary(file);
    payload.patient.profilePhoto = uploadResult?.secure_url as string;
  }

  const hashPass = await bcryptjs.hash(payload.password, 10);

  const result = await prisma.$transaction(async (transaction) => {
    await transaction.user.create({ data: { email: payload.patient.email, password: hashPass } });

    return await transaction.patient.create({ data: payload.patient });
  });

  return result;
};

const getAllUser = async (filters: any, options: IOptions) => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, sortBy, sortOrder } = paginationHelper.calculatePagination(options);

  const andConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({ OR: ["email"].map((field) => ({ [field]: { contains: searchTerm, mode: "insensitive" } })) });
  }

  if (Object.keys(filterData.length > 0)) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({ [key]: { equals: (filterData as any)[key] } })),
    });
  }

  const result = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: { AND: andConditions },

    orderBy: sortOrder && sortBy ? { [sortBy]: sortOrder } : { createdAt: "desc" },

    select: { id: true, email: true, role: true, status: true, needPasswordChange: true },
  });

  return result;
};

export const UserService = { createPatient, getAllUser };
