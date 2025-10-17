import config from "../../../config";
import { prisma } from "../../shared/prisma";
import { createPatientInput } from "./user.interface";
import bcryptjs from "bcryptjs";

const createPatient = async (payload: createPatientInput) => {
  console.log(payload);

  const hashPass = await bcryptjs.hash(payload.password, 10);

  const result = await prisma.$transaction(async (transaction) => {
    await transaction.user.create({ data: { email: payload.email, password: hashPass } });

    return await transaction.patient.create({ data: { name: payload.name, email: payload.email } });
  });

  return result;
};

export const UserService = { createPatient };
