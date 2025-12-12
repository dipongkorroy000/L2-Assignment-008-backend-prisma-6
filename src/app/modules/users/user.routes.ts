import express, {type NextFunction, type Request, type Response, Router} from "express";
import {imageFileUploader} from "../../utils/imageFileUploader";

import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { userController } from "./user.controller";

const router: Router = express.Router();

router.get("/", auth(UserRole.ADMIN), userController.getAllUsers);
router.get("/:id", userController.getUser);

router.post("/create-tourist", userController.createTourist);

router.post("/create-guide", userController.createGuide);

router.post("/create-admin", userController.createAdmin);

router.patch(
  "/update-profile",
  auth(UserRole.ADMIN, UserRole.GUIDE, UserRole.TOURIST),
  imageFileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return userController.updateProfile(req, res, next);
  }
);

router.patch("/:id/status", auth(UserRole.ADMIN), userController.updateProfileStatus);

export const userRoutes = router;