"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const prisma_1 = require("../../shared/prisma");
const client_1 = require("@prisma/client");
const handleStripeWebhookEvent = async (event) => {
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;
            console.log("payment session", session);
            const paymentId = session.metadata?.paymentId;
            console.log("paymentId session", paymentId);
            const result = await prisma_1.prisma.payment.update({
                where: { id: paymentId },
                data: {
                    status: session.payment_status === "paid" ? client_1.PaymentStatus.PAID : client_1.PaymentStatus.UNPAID,
                    paymentGatewayData: session,
                },
            });
            console.log("payment update result", result);
            break;
        }
        default:
            console.log(`I Unhandled event type: ${event.type}`);
    }
};
exports.StripeService = { handleStripeWebhookEvent };
//# sourceMappingURL=stripe.service.js.map