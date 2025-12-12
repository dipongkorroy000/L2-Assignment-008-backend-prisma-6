"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsService = void 0;
const client_1 = require("@prisma/client");
const ServerError_1 = __importDefault(require("../../errors/ServerError"));
const prisma_1 = require("../../shared/prisma");
const getReviews = async (email) => {
    const guide = await prisma_1.prisma.guide.findUniqueOrThrow({ where: { email } });
    const reviews = await prisma_1.prisma.requestForm.findMany({
        where: { payments: { status: client_1.PaymentStatus.PAID }, guideId: guide.id },
        include: { review: { select: { comment: true, rating: true, updatedAt: true } } },
        orderBy: { review: { updatedAt: "desc" } },
    });
    return reviews;
};
const createReview = async (email, requestedFormId, payload) => {
    const tourist = await prisma_1.prisma.tourist.findUniqueOrThrow({ where: { email } });
    const requestedForm = await prisma_1.prisma.requestForm.findUniqueOrThrow({ where: { id: requestedFormId } });
    if (tourist.id !== requestedForm.touristId)
        throw new ServerError_1.default(400, "Unauthorized user");
    await prisma_1.prisma.review.create({ data: { requestedFormId, comment: payload.comment, rating: payload.rating } });
};
exports.reviewsService = { getReviews, createReview };
//# sourceMappingURL=review.service.js.map