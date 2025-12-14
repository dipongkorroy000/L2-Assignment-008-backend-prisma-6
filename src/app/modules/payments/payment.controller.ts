import type {Request, Response} from "express";
import catchAsync from "../../shared/catchAsync";
import type {JwtPayload} from "jsonwebtoken";
import {PaymentService} from "./payment.service";
import sendResponse from "../../shared/sendResponse";

const paymentInit = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response) => {
  const {email} = req.token as JwtPayload;

  const result = await PaymentService.paymentInit(email as string, Number(req.params.id));

  sendResponse(res, {status: 201, success: true, message: "Payment paid successfully!", data: result});
});

const getPayments = catchAsync(async (req: Request & {token?: JwtPayload}, res: Response) => {
  const {email} = req.token as JwtPayload;

  const result = await PaymentService.getPayments(email as string);

  sendResponse(res, {status: 201, success: true, message: "Payment retrieved successfully!", data: result});
});

const getPayment = catchAsync(async (req: Request, res: Response) => {

  const result = await PaymentService.getPayment(req.params.transactionId as string);

  sendResponse(res, {status: 201, success: true, message: "Payment retrieved successfully!", data: result});
});

export const PaymentController = {paymentInit, getPayments , getPayment};