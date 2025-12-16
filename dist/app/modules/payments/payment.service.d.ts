export declare const PaymentService: {
    paymentInit: (tourFormId: number) => Promise<{
        paymentUrl: string | null;
    }>;
    getPayments: (email: string) => Promise<{
        payments: {
            status: import("@prisma/client").$Enums.PaymentStatus;
            updatedAt: Date;
            amount: number;
            transactionId: string;
        } | null;
    }[] | {
        status: import("@prisma/client").$Enums.PaymentStatus;
        updatedAt: Date;
        requestForm: {
            guide: {
                email: string;
            };
            tourist: {
                email: string;
            };
        };
        amount: number;
        paymentGatewayData: import("@prisma/client/runtime/library").JsonValue;
        transactionId: string;
    }[] | null>;
    getPayment: (transactionId: string) => Promise<{
        id: number;
        status: import("@prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        requestFormId: number;
        paymentGatewayData: import("@prisma/client/runtime/library").JsonValue | null;
        transactionId: string;
        stripeEventId: string | null;
    } | null>;
};
//# sourceMappingURL=payment.service.d.ts.map