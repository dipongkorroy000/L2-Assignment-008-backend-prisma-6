import { Gender } from "@prisma/client";
import z from "zod";


const createTouristValidationSchema = z.object({
  password: z.string(),
  tourist: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required"),
    address: z.string().optional(),
    contactNumber: z.string().min(11).nonempty("Contact Number is required"),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
  }),
});

const createGuideValidationSchema = z.object({
  password: z.string(),
  guide: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required"),
    address: z.string().optional(),
    contactNumber: z.string().min(11).nonempty("Contact Number is required"),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
  }),
});

const createAdminValidationSchema = z.object({
  password: z.string(),
  admin: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required"),
    address: z.string().optional(),
    contactNumber: z.string().min(11).nonempty("Contact Number is required"),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
  }),
});

export const userValidation = {createTouristValidationSchema, createGuideValidationSchema, createAdminValidationSchema};