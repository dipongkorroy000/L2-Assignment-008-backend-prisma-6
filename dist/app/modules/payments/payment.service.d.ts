export declare const PaymentService: {
    paymentInit: (touristEmail: string, tourFormId: number) => Promise<{
        paymentUrl: string | null;
    }>;
    getPayments: (email: string) => Promise<{
        payments: {
            status: import("@prisma/client").$Enums.PaymentStatus;
            updatedAt: Date;
            amount: number;
            transactionId: string;
        } | null;
    }[] | null>;
};
//# sourceMappingURL=payment.service.d.ts.map