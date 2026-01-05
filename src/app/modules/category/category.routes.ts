import express, {type Router} from "express";
import {categoryController} from "./category.controller";
import {UserRole} from "@prisma/client";
import auth from "../../middlewares/auth";

const router: Router = express.Router();

router.post("/", categoryController.createCategory);

router.get("/", categoryController.getAllCategory);

router.get("/tours", categoryController.getAllCategoryWithTours);

router.delete("/:id", auth(UserRole.ADMIN), categoryController.deleteCategory);

export const categoryRoutes = router;
