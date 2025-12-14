import type {Request, Response} from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

import {StripeService} from "./stripe.service";
import {stripe} from "../../shared/stripe";
import config from "../../../config";

const handleStripeWebhookEvent = catchAsync(async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = config.STRIPE.STRIPE_WEBHOOK_SECRET; // call localy secret-> stript

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    //---
  } catch (err: any) {
    console.error("⚠️ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const result = await StripeService.handleStripeWebhookEvent(event);

   res.status(200).send("Webhook received");
});

export const StripeController = {handleStripeWebhookEvent};
