import type {Request, Response} from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

import {StripeService} from "./stripe.service";
import {stripe} from "../../shared/stripe";

const handleStripeWebhookEvent = catchAsync(async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = ""; // call localy secret-> stript

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    //---
  } catch (err: any) {
    console.error("⚠️ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const result = await StripeService.handleStripeWebhookEvent(event);

  sendResponse(res, {status: 200, success: true, message: "Webhook req send successfully", data: result});
});

export const StripeController = {handleStripeWebhookEvent};
