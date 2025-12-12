"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const stripe_service_1 = require("./stripe.service");
const stripe_1 = require("../../shared/stripe");
const handleStripeWebhookEvent = (0, catchAsync_1.default)(async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = ""; // call localy secret-> stript
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
    (0, sendResponse_1.default)(res, { status: 200, success: true, message: "Webhook req send successfully", data: result });
});
exports.StripeController = { handleStripeWebhookEvent };
//# sourceMappingURL=stripe.controller.js.map