import express, {Router} from "express";
import {requestedTourController} from "./requested-tour.controller";
import auth from "../../middlewares/auth";
import {UserRole} from "@prisma/client";

const router: Router = express.Router();

router.post("/", auth(UserRole.TOURIST), requestedTourController.requestTour);

// requested-tours
router.get("/", auth(UserRole.TOURIST, UserRole.GUIDE), requestedTourController.getRequestedTourForm);

router.patch("/:id", auth(UserRole.TOURIST, UserRole.GUIDE), requestedTourController.updateRequestedTourFormStatus);

router.get("/upcoming-tours", auth(UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN), requestedTourController.upcomingTours);

router.get("/canceled-tours", auth(UserRole.TOURIST, UserRole.GUIDE), requestedTourController.canceledRequestedTours);

router.get("/completed-tours", auth(UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN), requestedTourController.completedRequestedTours);

router.get("/completed-review-tours", auth(UserRole.TOURIST), requestedTourController.completedToursReviewProvide);

export const requestedTourRoutes = router;
