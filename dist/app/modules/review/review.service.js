"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsService = void 0;
const client_1 = require("@prisma/client");
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
const createReview = async (requestedFormId, payload) => {
    return await prisma_1.prisma.$transaction(async (tnx) => {
        // 1. Create the review
        await tnx.review.create({ data: { requestedFormId, comment: payload.comment, rating: payload.rating } });
        // 2. Find the related tourId
        const requestForm = await tnx.requestForm.findUniqueOrThrow({ where: { id: requestedFormId }, select: { tourId: true } });
        // 3. Calculate new average rating for this tour
        const agg = await tnx.review.aggregate({
            _avg: { rating: true },
            where: { requestedForm: { tourId: requestForm.tourId } },
        });
        const newAverage = agg._avg.rating ?? 0;
        // 4. Update the tour's averageRating
        await tnx.tour.update({ where: { id: requestForm.tourId }, data: { averageRating: newAverage } });
        return { success: true, averageRating: newAverage };
    });
};
exports.reviewsService = { getReviews, createReview };
//# sourceMappingURL=review.service.js.map