import express, { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "./auth.controller";

const router: Router = express.Router();

router.post("/login", AuthController.login)

export const authRoutes = router;
