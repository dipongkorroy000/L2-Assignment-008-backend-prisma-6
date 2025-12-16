import Stripe from "stripe";
export declare const StripeService: {
    handleStripeWebhookEvent: (event: Stripe.Event) => Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=stripe.service.d.ts.map