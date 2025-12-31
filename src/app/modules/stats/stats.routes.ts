import express, {type NextFunction, type Request, type Response, Router} from "express";
import auth from "../../middlewares/auth";

import {statsController} from "./stats.controller";
import {UserRole} from "@prisma/client";

const router: Router = express.Router();

router.get("/admin", auth(UserRole.ADMIN), statsController.adminStats);

router.get("/guide", auth(UserRole.GUIDE), statsController.guideStats);

router.get("/chart", statsController.toursStatsForChart);

export const statsRoutes = router;
