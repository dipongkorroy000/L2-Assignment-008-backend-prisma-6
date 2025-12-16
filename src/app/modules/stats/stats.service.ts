import { PaymentStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";


const adminStats = async (email: string) => {
  const user = await prisma.user.findUniqueOrThrow({where: {email}});

  const admins = await prisma.admin.count();
  const tourists = await prisma.tourist.count();
  const guides = await prisma.guide.count();
  const tours = await prisma.tour.count();

  const totalPayments = await prisma.payment.count({where: {status: PaymentStatus.PAID}});
  const totalEarning = await prisma.payment.aggregate({where: {status: PaymentStatus.PAID}, _sum: {amount: true}});

  return {meta: {admins, tourists, guides, tours, totalPayments, totalEarning: totalEarning._sum.amount || 0}};
};

const guideStats = async (email: string) => {
  const user = await prisma.user.findUniqueOrThrow({where: {email}});

  const guide = await prisma.guide.findFirstOrThrow({where: {email}});

  // Count completed tours with paid status
  const completedToursForm = await prisma.requestForm.count({
    where: {
      guideId: guide.id,
      payments: {status: PaymentStatus.PAID}, // use `some` for relation filter
    },
  });

  const totalEarning = await prisma.payment.aggregate({
    _sum: {amount: true},
    where: {requestForm: {guideId: guide.id}},
  });

  return {
    meta: {
      completedTours: completedToursForm,
      totalEarning: totalEarning._sum.amount ?? 0,
    },
  };
};

export const statsService = {adminStats, guideStats};