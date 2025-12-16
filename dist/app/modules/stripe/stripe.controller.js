"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const stripe_service_1 = require("./stripe.service");
const stripe_1 = require("../../shared/stripe");
const config_1 = __importDefault(require("../../../config"));
const handleStripeWebhookEvent = (0, catchAsync_1.default)(async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = config_1.default.STRIPE.STRIPE_WEBHOOK_SECRET; // call localy secret-> stript
    if (!webhookSecret) {
        console.error("⚠️ Stripe webhook secret not configured");
        return res.status(500).send("Webhook secret not configured");
    }
    let event;
    try {
        event = stripe_1.stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        //---
    }
    catch (err) {
        console.error("⚠️ Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    const result = await stripe_service_1.StripeService.handleStripeWebhookEvent(event);
    res.status(200).send("Webhook received");
});
exports.StripeController = { handleStripeWebhookEvent };
//# sourceMappingURL=stripe.controller.js.map