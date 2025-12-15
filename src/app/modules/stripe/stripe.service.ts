import Stripe from "stripe";
import {prisma} from "../../shared/prisma";
import {PaymentStatus} from "@prisma/client";

const handleStripeWebhookEvent = async (event: Stripe.Event) => {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = await event.data.object as any;

      const transactionId = await session.metadata?.transactionId;

      const result = await prisma.payment.update({
        where: {transactionId: transactionId},
        data: {
          status: session.payment_status === "paid" ? PaymentStatus.PAID : PaymentStatus.UNPAID,
          paymentGatewayData: session,
        },
      });

      break;
    }

    default:
      console.log(`I Unhandled event type: ${event.type}`);
  }
};

export const StripeService = {handleStripeWebhookEvent};
