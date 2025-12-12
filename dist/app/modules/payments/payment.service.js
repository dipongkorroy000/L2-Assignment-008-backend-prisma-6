"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const client_1 = require("@prisma/client");
const ServerError_1 = __importDefault(require("../../errors/ServerError"));
const prisma_1 = require("../../shared/prisma");
const stripe_1 = require("../../shared/stripe");
const paymentInit = async (touristEmail, tourFormId) => {
    const tourist = await prisma_1.prisma.tourist.findUniqueOrThrow({ where: { email: touristEmail } });
    const requestForm = await prisma_1.prisma.requestForm.findUniqueOrThrow({
        where: { id: tourFormId },
        include: {
            guide: { select: { name: true } },
            tour: { select: { id: true, tourFee: true } },
            tourist: { select: { email: true } },
        },
    });
    if (tourist.email !== requestForm.tourist.email)
        throw new ServerError_1.default(400, "Unauthorized user");
    const result = await prisma_1.prisma.$transaction(async (tnx) => {
        const payment = await tnx.payment.create({ data: { amount: requestForm.tour.tourFee, requestFormId: requestForm.id } });
        // payment
        const session = await stripe_1.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: tourist.email,
            line_items: [
                {
                    price_data: {
                        currency: "bdt",
                        product_data: { name: `Tour with ${requestForm.guide.name}` },
                        unit_amount: payment.amount * 100,
                    },
                    quantity: 1,
                },
            ],
            metadata: { paymentId: payment.id, touristId: tourist.id },
            success_url: "http://localhost:3000/api/v1/payment/success",
            cancel_url: "http://localhost:3000/api/v1/payment/cancel",
        });
        return { paymentUrl: session.url };
    });
    return result;
};
const getPayments = async (email) => {
    const user = await prisma_1.prisma.user.findUniqueOrThrow({ where: { email } });
    if (user.role == client_1.UserRole.GUIDE) {
        const guide = await prisma_1.prisma.guide.findUniqueOrThrow({ where: { email } });
        return await prisma_1.prisma.requestForm.findMany({
            where: { guideId: guide.id },
            select: {
                payments: { select: { amount: true, updatedAt: true, status: true, transactionId: true } },
                tour: { select: { title: true } },
            },
        });
    }
    else if (user.role === client_1.UserRole.TOURIST) {
        const tourist = await prisma_1.prisma.tourist.findUniqueOrThrow({ where: { email } });
        return await prisma_1.prisma.requestForm.findMany({
            where: { tourId: tourist.id },
            select: {
                payments: { select: { amount: true, updatedAt: true, status: true, transactionId: true } },
            },
        });
    }
    if (user.role === client_1.UserRole.ADMIN) {
        const data = await prisma_1.prisma.payment.findMany({
            where: { status: client_1.PaymentStatus.PAID },
            select: {
                amount: true,
                updatedAt: true,
                paymentGatewayData: true,
                transactionId: true,
                status: true,
                requestForm: { select: { guide: { select: { email: true } }, tourist: { select: { email: true } } } },
            },
        });
    }
    return null;
};
exports.PaymentService = { paymentInit, getPayments };
//# sourceMappingURL=payment.service.js.map