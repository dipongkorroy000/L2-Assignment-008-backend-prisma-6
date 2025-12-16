import Stripe from "stripe";
import {prisma} from "../../shared/prisma";
import {PaymentStatus} from "@prisma/client";

const handleStripeWebhookEvent = async (event: Stripe.Event) => {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = (await event.data.object) as any;

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
    case "checkout.session.expired": {
      const session = event.data.object as any;
      console.log(`⚠️ Checkout session expired: ${session.id}`);
      // Appointment will be cleaned up by cron job
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as any;
      console.log(`❌ Payment failed: ${paymentIntent.id}`);
      break;
    }

    default:
      console.log(`I Unhandled event type: ${event.type}`);
  }

  return {message: "Webhook processed successfully"};
};

export const StripeService = {handleStripeWebhookEvent};
