import express, {Router} from "express";
import {authRoutes} from "../modules/auth/auth.routes";
import {userRoutes} from "../modules/users/user.routes";
import { statsRoutes } from "../modules/stats/stats.routes";
import { reviewsRoutes } from "../modules/review/review.routes";
import { tourRoutes } from "../modules/tours/tour.routes";
import { categoryRoutes } from "../modules/category/category.routes";
import { paymentRoutes } from "../modules/payments/payment.routes";
import { requestedTourRoutes } from "../modules/requested-tour/requested-tour.routes";

const router: Router = express.Router();

const moduleRoutes = [
  {path: "/auth", route: authRoutes},
  {path: "/user", route: userRoutes},
  {path: "/tours", route: tourRoutes},
  {path: "/category", route: categoryRoutes},
  {path: "/payment", route: paymentRoutes},
  {path: "/request-tour", route: requestedTourRoutes},
  {path: "/stats", route: statsRoutes},
  {path: "/review", route: reviewsRoutes},
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;