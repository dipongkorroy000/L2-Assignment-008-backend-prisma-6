import express, {type Router} from "express";
import {messageController} from "./message.controller";
import auth from "../../middlewares/auth";
import {UserRole} from "@prisma/client";

const router: Router = express.Router();

router.post("/", messageController.createMessage);
router.get("/", auth(UserRole.ADMIN), messageController.getMessages);

export const messageRoutes = router;
