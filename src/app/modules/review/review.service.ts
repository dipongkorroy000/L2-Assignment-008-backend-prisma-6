import {PaymentStatus} from "@prisma/client";
import ServerError from "../../errors/ServerError";
import {prisma} from "../../shared/prisma";

const getReviews = async (email: string) => {
  const guide = await prisma.guide.findUniqueOrThrow({where: {email}});

  const reviews = await prisma.requestForm.findMany({
    where: {payments: {status: PaymentStatus.PAID}, guideId: guide.id},
    include: {review: {select: {comment: true, rating: true, updatedAt: true}}},
    orderBy: {review: {updatedAt: "desc"}},
  });

  return reviews;
};

const createReview = async (requestedFormId: number, payload: {comment: string; rating: number}) => {
  return await prisma.$transaction(async (tnx) => {
    // 1. Create the review
    await tnx.review.create({data: {requestedFormId, comment: payload.comment, rating: payload.rating}});

    // 2. Find the related tourId
    const requestForm = await tnx.requestForm.findUniqueOrThrow({where: {id: requestedFormId}, select: {tourId: true}});

    // 3. Calculate new average rating for this tour
    const agg = await tnx.review.aggregate({
      _avg: {rating: true},
      where: {requestedForm: {tourId: requestForm.tourId}},
    });

    const newAverage = agg._avg.rating ?? 0;

    // 4. Update the tour's averageRating
    await tnx.tour.update({where: {id: requestForm.tourId}, data: {averageRating: newAverage}});

    return {success: true, averageRating: newAverage};
  });
};

export const reviewsService = {getReviews, createReview};
