import Stripe from "stripe";
import {prisma} from "../../shared/prisma";
import {PaymentStatus} from "@prisma/client";

const handleStripeWebhookEvent = async (event: Stripe.Event) => {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as any;

      console.log("payment session", session);

      const paymentId = session.metadata?.paymentId;

      console.log("paymentId session", paymentId);

      const result = await prisma.payment.update({
        where: {id: paymentId},
        data: {
          status: session.payment_status === "paid" ? PaymentStatus.PAID : PaymentStatus.UNPAID,
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

export const StripeService = {handleStripeWebhookEvent};
