import express, {type NextFunction, type Request, type Response, Router} from "express";
import auth from "../../middlewares/auth";

import {reviewsController} from "./review.controller";
import { UserRole } from "@prisma/client";

const router: Router = express.Router();

router.get("/guide", auth(UserRole.GUIDE), reviewsController.getReviews);

router.patch("/tourist-create-review/:id", auth(UserRole.TOURIST), reviewsController.createReview);

export const reviewsRoutes = router;