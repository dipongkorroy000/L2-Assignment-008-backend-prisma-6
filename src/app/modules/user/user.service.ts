import config from "../../../config";
import { fileUploader } from "../../helper/fileUploader";
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

export const UserService = { createPatient };
