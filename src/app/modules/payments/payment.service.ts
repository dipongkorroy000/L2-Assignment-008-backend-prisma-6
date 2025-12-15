import {PaymentStatus, UserRole} from "@prisma/client";
import ServerError from "../../errors/ServerError";
import {prisma} from "../../shared/prisma";
import {stripe} from "../../shared/stripe";
import config from "../../../config";

const paymentInit = async (tourFormId: number) => {
  const requestForm = await prisma.requestForm.findUniqueOrThrow({
    where: {id: tourFormId},
    include: {
      guide: {select: {name: true}},
      tour: {select: {id: true, tourFee: true}},
      tourist: {select: {id: true, email: true}},
    },
  });

  const result = await prisma.$transaction(async (tnx) => {
    let payment = await prisma.payment.findUnique({
      where: {requestFormId: tourFormId},
    });

    if (payment?.status === PaymentStatus.PAID) throw new ServerError(400, "Already payment"); 

    if (!payment) {
      payment = await tnx.payment.create({data: {amount: requestForm.tour.tourFee, requestFormId: requestForm.id}});
    }

    // payment
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: requestForm.tourist.email,
      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {name: `Tour with ${requestForm.guide.name}`},
            unit_amount: payment.amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {transactionId: payment.transactionId, touristId: requestForm.tourist.id},

      success_url: `${config.PAYMENT_SUCCESS_URL}?transactionId=${payment.transactionId}`,
      cancel_url: `${config.PAYMENT_CANCEL_URL}?transactionId=${payment.transactionId}`,
    });

    return {paymentUrl: session.url};
  });

  return result;
};

const getPayments = async (email: string) => {
  const user = await prisma.user.findUniqueOrThrow({where: {email}});

  if (user.role == UserRole.GUIDE) {
    const guide = await prisma.guide.findUniqueOrThrow({where: {email}});

    return await prisma.requestForm.findMany({
      where: {guideId: guide.id},
      select: {
        payments: {select: {amount: true, updatedAt: true, status: true, transactionId: true}},
        tour: {select: {title: true}},
      },
    });
  } else if (user.role === UserRole.TOURIST) {
    const tourist = await prisma.tourist.findUniqueOrThrow({where: {email}});

    return await prisma.requestForm.findMany({
      where: {tourId: tourist.id},
      select: {
        payments: {select: {amount: true, updatedAt: true, status: true, transactionId: true}},
      },
    });
  }

  if (user.role === UserRole.ADMIN) {
    const data = await prisma.payment.findMany({
      where: {status: PaymentStatus.PAID},
      select: {
        amount: true,
        updatedAt: true,
        paymentGatewayData: true,
        transactionId: true,
        status: true,
        requestForm: {select: {guide: {select: {email: true}}, tourist: {select: {email: true}}}},
      },
    });
  }
  return null;
};

const getPayment = async (transactionId: string) => {
  return prisma.payment.findUnique({where: {transactionId}});
};

export const PaymentService = {paymentInit, getPayments, getPayment};
