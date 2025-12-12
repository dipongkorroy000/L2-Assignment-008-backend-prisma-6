import express, {Router, type NextFunction, type Request, type Response} from "express";
import {tourController} from "./tour.controller";
import auth from "../../middlewares/auth";

import {imageFileUploader} from "../../utils/imageFileUploader";
import { UserRole } from "@prisma/client";

const router: Router = express.Router();

router.post("/:email", imageFileUploader.upload.single("file"), (req: Request, res: Response, next: NextFunction) => {
  req.body = JSON.parse(req.body.data);
  return tourController.createTour(req, res, next);
});

router.get("/", tourController.getAllTours);

router.get("/guide", auth(UserRole.GUIDE), tourController.getToursByGuide);

router.get("/:id", tourController.getTourById);

router.put("/:id", auth(UserRole.GUIDE), tourController.updateTourByGuide);

router.put("/:id/status", auth(UserRole.GUIDE), tourController.updateTourStatusByGuide);

router.delete("/:id", auth(UserRole.GUIDE, UserRole.ADMIN), tourController.deleteTour);

export const tourRoutes = router;