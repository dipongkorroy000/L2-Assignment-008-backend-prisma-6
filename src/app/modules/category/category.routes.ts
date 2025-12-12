import express, {type Router} from "express";
import {categoryController} from "./category.controller";

const router: Router = express.Router();

router.post("/", categoryController.createCategory);

router.get("/", categoryController.getAllCategory);

router.get("/tours", categoryController.getAllCategoryWithTours);

export const categoryRoutes = router;