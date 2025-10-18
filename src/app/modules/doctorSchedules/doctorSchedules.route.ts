import express, { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { DoctorScheduleController } from "./doctorSchedules.controller";

const router: Router = express.Router();

router.post("/", auth(UserRole.DOCTOR), DoctorScheduleController.insertIntoDB);

export const doctorScheduleRoutes = router;
