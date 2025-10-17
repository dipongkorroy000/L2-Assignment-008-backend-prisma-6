import { createPatientInput } from "./user.interface";

const createPatient = async (payload: createPatientInput) => {
  console.log(payload);

  return payload;
};

export const UserService = { createPatient };
