import express, {type Router} from "express";
import {authController} from "./auth.controller";

import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = express.Router();

router.post("/login", authController.login);

router.get("/profile", auth(UserRole.ADMIN, UserRole.GUIDE, UserRole.TOURIST), authController.getProfile);

router.patch("/password-update", auth(UserRole.ADMIN, UserRole.GUIDE, UserRole.TOURIST), authController.passwordUpdate);

router.patch("/profile-status-update", auth(UserRole.ADMIN, UserRole.GUIDE, UserRole.TOURIST), authController.userProfileStatusUpdate);

export const authRoutes = router;