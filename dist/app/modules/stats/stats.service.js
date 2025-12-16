"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statsService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../shared/prisma");
const adminStats = async (email) => {
    const user = await prisma_1.prisma.user.findUniqueOrThrow({ where: { email } });
    const admins = await prisma_1.prisma.admin.count();
    const tourists = await prisma_1.prisma.tourist.count();
    const guides = await prisma_1.prisma.guide.count();
    const tours = await prisma_1.prisma.tour.count();
    const totalPayments = await prisma_1.prisma.payment.count({ where: { status: client_1.PaymentStatus.PAID } });
    const totalEarning = await prisma_1.prisma.payment.aggregate({ where: { status: client_1.PaymentStatus.PAID }, _sum: { amount: true } });
    return { meta: { admins, tourists, guides, tours, totalPayments, totalEarning: totalEarning._sum.amount || 0 } };
};
const guideStats = async (email) => {
    const user = await prisma_1.prisma.user.findUniqueOrThrow({ where: { email } });
    const guide = await prisma_1.prisma.guide.findFirstOrThrow({ where: { email } });
    // Count completed tours with paid status
    const completedToursForm = await prisma_1.prisma.requestForm.count({
        where: {
            guideId: guide.id,
            payments: { status: client_1.PaymentStatus.PAID }, // use `some` for relation filter
        },
    });
    const totalEarning = await prisma_1.prisma.payment.aggregate({
        _sum: { amount: true },
        where: { status: client_1.PaymentStatus.PAID, requestForm: { guideId: guide.id } },
    });
    return {
        meta: {
            completedTours: completedToursForm,
            totalEarning: totalEarning._sum.amount ?? 0,
        },
    };
};
exports.statsService = { adminStats, guideStats };
//# sourceMappingURL=stats.service.js.map