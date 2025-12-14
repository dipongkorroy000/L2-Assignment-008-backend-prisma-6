export declare const PaymentService: {
    paymentInit: (tourFormId: number) => Promise<{
        paymentUrl: import("@prisma/client/runtime/library").JsonValue;
    }>;
    getPayments: (email: string) => Promise<{
        payments: {
            status: import("@prisma/client").$Enums.PaymentStatus;
            updatedAt: Date;
            amount: number;
            transactionId: string;
        } | null;
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
    } | null>;
};
//# sourceMappingURL=payment.service.d.ts.map