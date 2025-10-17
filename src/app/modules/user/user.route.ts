import express, { Router } from "express";
import { UserController } from "./user.controller";

const router: Router = express.Router();

router.post("/create-patient", UserController.createPatient)

export const userRoutes = router;
