import { RequestFormStatus } from "@prisma/client";
import type { IRequestTour } from "./requested-tour.interface";
export declare const requestedTourService: {
    requestTour: (email: string, payload: IRequestTour) => Promise<{
        id: number;
        status: import("@prisma/client").$Enums.RequestFormStatus;
        createdAt: Date;
        updatedAt: Date;
        guideId: number;
        tourId: number;
        touristId: number;
        tourDate: Date;
        comment: string;
    }>;
    getRequestedTourForm: (email: string) => Promise<{
        id: number;
        status: import("@prisma/client").$Enums.RequestFormStatus;
        updatedAt: Date;
        guide: {
            email: string;
            contactNumber: string;
        };
        tour: {
            title: string;
            isActive: boolean;
        };
        comment: string;
        payments: {
            status: import("@prisma/client").$Enums.PaymentStatus;
            transactionId: string;
        } | null;
    }[] | {
        id: number;
        status: import("@prisma/client").$Enums.RequestFormStatus;
        updatedAt: Date;
        tourist: {
            email: string;
            contactNumber: string;
        };
        tour: {
            title: string;
        };
        comment: string;
        payments: {
            status: import("@prisma/client").$Enums.PaymentStatus;
            transactionId: string;
        } | null;
    }[] | undefined>;
    updateRequestedTourFormStatus: (email: string, id: number, payload: {
        status: RequestFormStatus;
    }) => Promise<{
        id: number;
        status: import("@prisma/client").$Enums.RequestFormStatus;
        createdAt: Date;
        updatedAt: Date;
        guideId: number;
        tourId: number;
        touristId: number;
        tourDate: Date;
        comment: string;
    }>;
    upcomingTours: (email: string) => Promise<{
        tour: {
            id: number;
            guide: {
                email: string;
                contactNumber: string;
            };
            category: {
                id: number;
                title: string;
            };
            title: string;
            groupMembers: number;
        };
        tourDate: Date;
    }[] | {
        tourist: {
            email: string;
            contactNumber: string;
        };
        tour: {
            id: number;
            category: {
                id: number;
                title: string;
            };
            title: string;
            groupMembers: number;
        };
        tourDate: Date;
    }[]>;
    canceledRequestedTours: (email: string) => Promise<{
        id: number;
        status: import("@prisma/client").$Enums.RequestFormStatus;
        updatedAt: Date;
        guide: {
            email: string;
            contactNumber: string;
        };
        tour: {
            title: string;
        };
        comment: string;
        payments: {
            status: import("@prisma/client").$Enums.PaymentStatus;
            transactionId: string;
        } | null;
    }[] | {
        id: number;
        status: import("@prisma/client").$Enums.RequestFormStatus;
        updatedAt: Date;
        tourist: {
            email: string;
            contactNumber: string;
        };
        tour: {
            title: string;
        };
        comment: string;
        payments: {
            status: import("@prisma/client").$Enums.PaymentStatus;
            transactionId: string;
        } | null;
    }[] | undefined>;
    completedRequestedTours: (email: string) => Promise<{
        id: number;
        status: import("@prisma/client").$Enums.RequestFormStatus;
        updatedAt: Date;
        guide: {
            email: string;
            contactNumber: string;
        };
        tour: {
            title: string;
        };
        comment: string;
        payments: {
            status: import("@prisma/client").$Enums.PaymentStatus;
            transactionId: string;
        } | null;
    }[] | {
        id: number;
        status: import("@prisma/client").$Enums.RequestFormStatus;
        updatedAt: Date;
        tourist: {
            email: string;
            contactNumber: string;
        };
        tour: {
            title: string;
        };
        comment: string;
        payments: {
            status: import("@prisma/client").$Enums.PaymentStatus;
            transactionId: string;
        } | null;
    }[] | {
        id: number;
        status: import("@prisma/client").$Enums.RequestFormStatus;
        updatedAt: Date;
        guide: {
            email: string;
        };
        tourist: {
            email: string;
        };
        tour: {
            title: string;
        };
        payments: {
            transactionId: string;
        } | null;
    }[] | undefined>;
    completedToursReviewProvide: (email: string) => Promise<{
        id: number;
        status: import("@prisma/client").$Enums.RequestFormStatus;
        updatedAt: Date;
        guide: {
            name: string;
        };
        tour: {
            title: string;
        };
    }[]>;
};
//# sourceMappingURL=requested-tour.service.d.ts.map