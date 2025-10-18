import express, { type Router } from "express";
import { ScheduleController } from "./schedule.controller";

const router: Router = express.Router();

router.post("/", ScheduleController.insertIntoDB);

router.get("/", ScheduleController.schedulesForDoctor);

router.delete("/:id", ScheduleController.deleteScheduleFromDB);

export const scheduleRoutes = router;
