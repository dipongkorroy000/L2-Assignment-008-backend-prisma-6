
import { PaymentStatus } from "@prisma/client";
import ServerError from "../../errors/ServerError";
import { prisma } from "../../shared/prisma";

const getReviews = async (email: string) => {
  const guide = await prisma.guide.findUniqueOrThrow({where: {email}});

  const reviews = await prisma.requestForm.findMany({
    where: {payments: {status: PaymentStatus.PAID}, guideId: guide.id},
    include: {review: {select: {comment: true, rating: true, updatedAt: true}}},
    orderBy: {review: {updatedAt: "desc"}},
  });

  return reviews;
};

const createReview = async (email: string, requestedFormId: number, payload: {comment: string, rating: number}) => {
  const tourist = await prisma.tourist.findUniqueOrThrow({where: {email}});

  const requestedForm = await prisma.requestForm.findUniqueOrThrow({where: {id: requestedFormId}});

  if (tourist.id !== requestedForm.touristId) throw new ServerError(400, "Unauthorized user");

  await prisma.review.create({ data: {requestedFormId, comment: payload.comment, rating: payload.rating}});
};

export const reviewsService = {getReviews, createReview};