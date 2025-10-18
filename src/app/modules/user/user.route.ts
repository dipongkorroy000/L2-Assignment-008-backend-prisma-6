import express, { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { fileUploader } from "../../helper/fileUploader";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = express.Router();

router.post("/create-patient", fileUploader.upload.single("file"), (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.body.data, req.file);
  req.body = UserValidation.createPatientValidationSchema.parse(JSON.parse(req.body.data));
  return UserController.createPatient(req, res, next);
});

router.get("/", UserController.getAllUser);

router.post(
  "/create-doctor",
  auth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body.data, req.file);
    req.body = UserValidation.createDoctorValidationSchema.parse(JSON.parse(req.body.data));
    return UserController.createDoctor(req, res, next);
  }
);

export const userRoutes = router;
