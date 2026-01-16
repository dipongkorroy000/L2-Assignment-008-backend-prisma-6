import {PaymentStatus, RequestFormStatus, UserRole, UserStatus} from "@prisma/client";
import ServerError from "../../errors/ServerError";
import {prisma} from "../../shared/prisma";
import type {IRequestTour} from "./requested-tour.interface";

const requestTour = async (email: string, payload: IRequestTour) => {
  await prisma.user.findUniqueOrThrow({where: {email, status: UserStatus.ACTIVE}});

  const tourist = await prisma.tourist.findUniqueOrThrow({where: {email}});

  // find last request for same tourId + guideId + touristId
  const lastRequest = await prisma.requestForm.findFirst({
    where: {
      tourId: Number(payload.tourId),
      touristId: tourist.id,
      guideId: Number(payload.guideId),
    },
    orderBy: {createdAt: "desc"},
  });

  if (lastRequest) {
    const now = Date.now();
    const last = new Date(lastRequest.createdAt).getTime();
    const diffInDays = (now - last) / (1000 * 60 * 60 * 24);

    if (diffInDays < 2) {
      throw new ServerError(400, "You have already requested this tour");
    }
  }

  // create new request
  return await prisma.requestForm.create({data: {...payload, touristId: tourist.id}});
};

const getRequestedTourForm = async (email: string) => {
  const user = await prisma.user.findUniqueOrThrow({where: {email}});

  if (user.role === UserRole.TOURIST) {
    return await prisma.requestForm.findMany({
      where: {
        tourist: {email},
        status: {in: [RequestFormStatus.PENDING, RequestFormStatus.CONFIRMED]}, // ✅ fix
      },
      select: {
        id: true,
        tour: {select: {title: true, isActive: true}},
        comment: true,
        status: true,
        guide: {select: {contactNumber: true, email: true}},
        payments: {select: {status: true, transactionId: true}},
        updatedAt: true,
      },
    });
  }

  if (user.role === UserRole.GUIDE) {
    return await prisma.requestForm.findMany({
      where: {
        guide: {email},
        status: {in: [RequestFormStatus.PENDING, RequestFormStatus.CONFIRMED]}, // ✅ fix
      },
      select: {
        id: true,
        tour: {select: {title: true}},
        comment: true,
        status: true,
        tourist: {select: {contactNumber: true, email: true}},
        payments: {select: {status: true, transactionId: true}},
        updatedAt: true,
      },
    });
  }
};

const updateRequestedTourFormStatus = async (email: string, id: number, payload: {status: RequestFormStatus}) => {
  const user = await prisma.user.findUniqueOrThrow({where: {email, status: UserStatus.ACTIVE}});

  const requestedTourForm = await prisma.requestForm.findUniqueOrThrow({where: {id}});

  if (user.role === UserRole.TOURIST) {
    // find tourist by requestedTourForm.touristId
    const tourist = await prisma.tourist.findUniqueOrThrow({where: {id: requestedTourForm.touristId}});

    if (tourist.email !== user.email) throw new ServerError(400, "Not Authorized as Tourist");

    return await prisma.requestForm.update({where: {id, touristId: tourist.id}, data: {status: payload.status}});
  }

  if (user.role === UserRole.GUIDE) {
    // find guide by requestedTourForm.guideId
    const guide = await prisma.guide.findUniqueOrThrow({where: {id: requestedTourForm.guideId}});

    if (guide.email !== user.email) throw new ServerError(400, "Not Authorized as Guide");

    return await prisma.requestForm.update({where: {id, guideId: guide.id}, data: {status: payload.status}});
  }

  throw new ServerError(400, "Invalid role");
};

const upcomingTours = async (email: string) => {
  const user = await prisma.user.findUniqueOrThrow({where: {email}});

  // upcoming tours
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 15);

  if (user.role === UserRole.TOURIST) {
    const tourist = await prisma.tourist.findUniqueOrThrow({where: {email}});

    if (tourist.email !== user.email) throw new ServerError(400, "Not Authorized as Tourist");

    return await prisma.requestForm.findMany({
      where: {
        touristId: tourist.id,
        status: RequestFormStatus.CONFIRMED, // or whatever status means upcoming
        tourDate: {gte: today, lte: maxDate},
        payments: {status: PaymentStatus.PAID},
      },
      select: {
        tour: {
          select: {
            id: true,
            title: true,
            groupMembers: true,
            category: true,
            guide: {select: {contactNumber: true, email: true}},
          },
        },
        tourDate: true,
      },
      orderBy: {createdAt: "desc"},
    });
  }

  if (user.role === UserRole.GUIDE) {
    const guide = await prisma.guide.findUniqueOrThrow({where: {email}});

    if (guide.email !== user.email) throw new ServerError(400, "Not Authorized as Guide");

    return await prisma.requestForm.findMany({
      where: {
        guideId: guide.id,
        status: RequestFormStatus.CONFIRMED, // or "COMPLETED" if that's your business logic
        tourDate: {gte: today, lte: maxDate},
        payments: {status: PaymentStatus.PAID},
      },
      select: {
        tour: {
          select: {
            id: true,
            title: true,
            groupMembers: true,
            category: true,
          },
        },
        tourist: {select: {email: true, contactNumber: true}},
        tourDate: true,
      },
      orderBy: {createdAt: "desc"},
    });
  }

  if (user.role === UserRole.ADMIN) {
    return await prisma.requestForm.findMany({
      where: {
        status: RequestFormStatus.CONFIRMED, // or "COMPLETED" if that's your business logic
        tourDate: {gte: today, lte: maxDate},
        payments: {status: PaymentStatus.PAID},
      },
      select: {
        tour: {
          select: {
            id: true,
            title: true,
            groupMembers: true,
            category: true,
            guide: {select: {email: true, contactNumber: true}},
          },
        },
        tourist: {select: {email: true, contactNumber: true}},
        tourDate: true,
      },
      orderBy: {createdAt: "desc"},
    });
  }

  throw new ServerError(400, "Invalid role");
};

const canceledRequestedTours = async (email: string) => {
  const user = await prisma.user.findUniqueOrThrow({where: {email, status: UserStatus.ACTIVE}});

  if (user.role === UserRole.TOURIST) {
    return await prisma.requestForm.findMany({
      where: {tourist: {email}, status: RequestFormStatus.CANCELLED},
      select: {
        id: true,
        tour: {select: {title: true}},
        comment: true,
        status: true,
        guide: {select: {contactNumber: true, email: true}},
        payments: {select: {status: true, transactionId: true}},
        updatedAt: true,
      },
    });
  }

  if (user.role === UserRole.GUIDE) {
    return await prisma.requestForm.findMany({
      where: {guide: {email}, status: RequestFormStatus.CANCELLED},
      select: {
        id: true,
        tour: {select: {title: true}},
        comment: true,
        status: true,
        tourist: {select: {contactNumber: true, email: true}},
        payments: {select: {status: true, transactionId: true}},
        updatedAt: true,
      },
    });
  }
};

const completedRequestedTours = async (email: string) => {
  const user = await prisma.user.findUniqueOrThrow({where: {email}});

  if (user.role === UserRole.TOURIST) {
    return await prisma.requestForm.findMany({
      where: {tourist: {email}, status: RequestFormStatus.COMPLETED, payments: {status: PaymentStatus.PAID}},
      select: {
        id: true,
        tour: {select: {title: true}},
        comment: true,
        status: true,
        guide: {select: {contactNumber: true, email: true}},
        payments: {select: {status: true, transactionId: true}},
        updatedAt: true,
      },
      orderBy: {createdAt: "desc"},
    });
  }

  if (user.role === UserRole.GUIDE) {
    return await prisma.requestForm.findMany({
      where: {guide: {email}, status: RequestFormStatus.COMPLETED, payments: {status: PaymentStatus.PAID}},
      select: {
        id: true,
        tour: {select: {title: true}},
        comment: true,
        status: true,
        tourist: {select: {contactNumber: true, email: true}},
        payments: {select: {status: true, transactionId: true}},
        updatedAt: true,
      },
      orderBy: {createdAt: "desc"},
    });
  }

  if (user.role === UserRole.ADMIN) {
    return await prisma.requestForm.findMany({
      where: {status: RequestFormStatus.COMPLETED, payments: {status: PaymentStatus.PAID}},
      select: {
        id: true,
        tour: {select: {title: true}},
        status: true,
        tourist: {select: {email: true}},
        guide: {select: {email: true}},
        payments: {select: {transactionId: true}},
        updatedAt: true,
      },
      orderBy: {createdAt: "desc"},
    });
  }
};

const completedToursReviewProvide = async (email: string) => {
  await prisma.user.findUniqueOrThrow({where: {email, status: UserStatus.ACTIVE}});
  
  await prisma.tourist.findUniqueOrThrow({where: {email}});

  return await prisma.requestForm.findMany({
    where: {
      tourist: {email},
      status: RequestFormStatus.COMPLETED,
      payments: {status: PaymentStatus.PAID},
      review: null, // ✅ only forms without a review
    },
    select: {
      id: true,
      tour: {select: {title: true}},
      status: true,
      guide: {select: {name: true}},
      updatedAt: true,
    },
    orderBy: {createdAt: "desc"},
  });
};

export const requestedTourService = {
  requestTour,
  getRequestedTourForm,
  updateRequestedTourFormStatus,
  upcomingTours,
  canceledRequestedTours,
  completedRequestedTours,
  completedToursReviewProvide,
};
