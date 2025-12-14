import express, {type Router} from "express";
import {PaymentController} from "./payment.controller";

import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = express.Router();

router.post("/:id", PaymentController.paymentInit);

router.get("/", auth(UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN), PaymentController.getPayments);

router.get("/:transactionId" , PaymentController.getPayment);

export const paymentRoutes = router;