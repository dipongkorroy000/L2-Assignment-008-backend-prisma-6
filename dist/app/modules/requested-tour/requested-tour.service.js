"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestedTourService = void 0;
const client_1 = require("@prisma/client");
const ServerError_1 = __importDefault(require("../../errors/ServerError"));
const prisma_1 = require("../../shared/prisma");
const requestTour = async (email, payload) => {
    const tourist = await prisma_1.prisma.tourist.findUniqueOrThrow({ where: { email } });
    // find last request for same tourId + guideId + touristId
    const lastRequest = await prisma_1.prisma.requestForm.findFirst({
        where: {
            tourId: Number(payload.tourId),
            touristId: tourist.id,
            guideId: Number(payload.guideId),
        },
        orderBy: { createdAt: "desc" },
    });
    if (lastRequest) {
        const now = Date.now();
        const last = new Date(lastRequest.createdAt).getTime();
        const diffInDays = (now - last) / (1000 * 60 * 60 * 24);
        if (diffInDays < 2) {
            throw new ServerError_1.default(400, "You have already requested this tour with the same guide within the last 2 days.");
        }
    }
    // create new request
    return await prisma_1.prisma.requestForm.create({
        data: {
            ...payload,
            touristId: tourist.id,
        },
    });
};
const getRequestedTourForm = async (email) => {
    const user = await prisma_1.prisma.user.findUniqueOrThrow({ where: { email } });
    if (user.role === client_1.UserRole.TOURIST) {
        return await prisma_1.prisma.requestForm.findMany({
            where: {
                tourist: { email },
                status: { in: [client_1.RequestFormStatus.PENDING, client_1.RequestFormStatus.CONFIRMED] }, // ✅ fix
            },
            select: {
                id: true,
                tour: { select: { title: true, isActive: true } },
                comment: true,
                status: true,
                guide: { select: { contactNumber: true, email: true } },
                payments: { select: { status: true, transactionId: true } },
                updatedAt: true,
            },
        });
    }
    if (user.role === client_1.UserRole.GUIDE) {
        return await prisma_1.prisma.requestForm.findMany({
            where: {
                guide: { email },
                status: { in: [client_1.RequestFormStatus.PENDING, client_1.RequestFormStatus.CONFIRMED] }, // ✅ fix
            },
            select: {
                id: true,
                tour: { select: { title: true } },
                comment: true,
                status: true,
                tourist: { select: { contactNumber: true, email: true } },
                payments: { select: { status: true, transactionId: true } },
                updatedAt: true,
            },
        });
    }
};
const updateRequestedTourFormStatus = async (email, id, payload) => {
    const user = await prisma_1.prisma.user.findUniqueOrThrow({ where: { email } });
    const requestedTourForm = await prisma_1.prisma.requestForm.findUniqueOrThrow({ where: { id } });
    if (user.role === client_1.UserRole.TOURIST) {
        // find tourist by requestedTourForm.touristId
        const tourist = await prisma_1.prisma.tourist.findUniqueOrThrow({ where: { id: requestedTourForm.touristId } });
        if (tourist.email !== user.email)
            throw new ServerError_1.default(400, "Not Authorized as Tourist");
        return await prisma_1.prisma.requestForm.update({ where: { id, touristId: tourist.id }, data: { status: payload.status } });
    }
    if (user.role === client_1.UserRole.GUIDE) {
        // find guide by requestedTourForm.guideId
        const guide = await prisma_1.prisma.guide.findUniqueOrThrow({ where: { id: requestedTourForm.guideId } });
        if (guide.email !== user.email)
            throw new ServerError_1.default(400, "Not Authorized as Guide");
        return await prisma_1.prisma.requestForm.update({ where: { id, guideId: guide.id }, data: { status: payload.status } });
    }
    throw new ServerError_1.default(400, "Invalid role");
};
const upcomingTours = async (email) => {
    const user = await prisma_1.prisma.user.findUniqueOrThrow({ where: { email } });
    // upcoming tours
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 15);
    if (user.role === client_1.UserRole.TOURIST) {
        const tourist = await prisma_1.prisma.tourist.findUniqueOrThrow({ where: { email } });
        if (tourist.email !== user.email)
            throw new ServerError_1.default(400, "Not Authorized as Tourist");
        return await prisma_1.prisma.requestForm.findMany({
            where: {
                touristId: tourist.id,
                status: client_1.RequestFormStatus.CONFIRMED, // or whatever status means upcoming
                tourDate: { gte: today, lte: maxDate },
                payments: { status: client_1.PaymentStatus.PAID },
            },
            select: {
                tour: {
                    select: {
                        id: true,
                        title: true,
                        groupMembers: true,
                        category: true,
                        guide: { select: { contactNumber: true, email: true } },
                    },
                },
                tourDate: true,
            },
            orderBy: { createdAt: "desc" },
        });
    }
    if (user.role === client_1.UserRole.GUIDE) {
        const guide = await prisma_1.prisma.guide.findUniqueOrThrow({ where: { email } });
        if (guide.email !== user.email)
            throw new ServerError_1.default(400, "Not Authorized as Guide");
        return await prisma_1.prisma.requestForm.findMany({
            where: {
                guideId: guide.id,
                status: client_1.RequestFormStatus.CONFIRMED, // or "COMPLETED" if that's your business logic
                tourDate: { gte: today, lte: maxDate },
                payments: { status: client_1.PaymentStatus.PAID },
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
                tourist: { select: { email: true, contactNumber: true } },
                tourDate: true,
            },
            orderBy: { createdAt: "desc" },
        });
    }
    if (user.role === client_1.UserRole.ADMIN) {
        return await prisma_1.prisma.requestForm.findMany({
            where: {
                status: client_1.RequestFormStatus.CONFIRMED, // or "COMPLETED" if that's your business logic
                tourDate: { gte: today, lte: maxDate },
                payments: { status: client_1.PaymentStatus.PAID },
            },
            select: {
                tour: {
                    select: {
                        id: true,
                        title: true,
                        groupMembers: true,
                        category: true,
                        guide: { select: { email: true, contactNumber: true } },
                    },
                },
                tourist: { select: { email: true, contactNumber: true } },
                tourDate: true,
            },
            orderBy: { createdAt: "desc" },
        });
    }
    throw new ServerError_1.default(400, "Invalid role");
};
const canceledRequestedTours = async (email) => {
    const user = await prisma_1.prisma.user.findUniqueOrThrow({ where: { email } });
    if (user.role === client_1.UserRole.TOURIST) {
        return await prisma_1.prisma.requestForm.findMany({
            where: { tourist: { email }, status: client_1.RequestFormStatus.CANCELLED },
            select: {
                id: true,
                tour: { select: { title: true } },
                comment: true,
                status: true,
                guide: { select: { contactNumber: true, email: true } },
                payments: { select: { status: true, transactionId: true } },
                updatedAt: true,
            },
        });
    }
    if (user.role === client_1.UserRole.GUIDE) {
        return await prisma_1.prisma.requestForm.findMany({
            where: { guide: { email }, status: client_1.RequestFormStatus.CANCELLED },
            select: {
                id: true,
                tour: { select: { title: true } },
                comment: true,
                status: true,
                tourist: { select: { contactNumber: true, email: true } },
                payments: { select: { status: true, transactionId: true } },
                updatedAt: true,
            },
        });
    }
};
const completedRequestedTours = async (email) => {
    const user = await prisma_1.prisma.user.findUniqueOrThrow({ where: { email } });
    if (user.role === client_1.UserRole.TOURIST) {
        return await prisma_1.prisma.requestForm.findMany({
            where: { tourist: { email }, status: client_1.RequestFormStatus.COMPLETED, payments: { status: client_1.PaymentStatus.PAID } },
            select: {
                id: true,
                tour: { select: { title: true } },
                comment: true,
                status: true,
                guide: { select: { contactNumber: true, email: true } },
                payments: { select: { status: true, transactionId: true } },
                updatedAt: true,
            },
            orderBy: { createdAt: "desc" },
        });
    }
    if (user.role === client_1.UserRole.GUIDE) {
        return await prisma_1.prisma.requestForm.findMany({
            where: { guide: { email }, status: client_1.RequestFormStatus.COMPLETED, payments: { status: client_1.PaymentStatus.PAID } },
            select: {
                id: true,
                tour: { select: { title: true } },
                comment: true,
                status: true,
                tourist: { select: { contactNumber: true, email: true } },
                payments: { select: { status: true, transactionId: true } },
                updatedAt: true,
            },
            orderBy: { createdAt: "desc" },
        });
    }
    if (user.role === client_1.UserRole.ADMIN) {
        return await prisma_1.prisma.requestForm.findMany({
            where: { guide: { email }, status: client_1.RequestFormStatus.COMPLETED, payments: { status: client_1.PaymentStatus.PAID } },
            select: {
                id: true,
                tour: { select: { title: true } },
                status: true,
                tourist: { select: { email: true } },
                guide: { select: { email: true } },
                payments: { select: { transactionId: true } },
                updatedAt: true,
            },
            orderBy: { createdAt: "desc" },
        });
    }
};
const completedToursReviewProvide = async (email) => {
    const user = await prisma_1.prisma.tourist.findUniqueOrThrow({ where: { email } });
    return await prisma_1.prisma.requestForm.findMany({
        where: {
            tourist: { email },
            status: client_1.RequestFormStatus.COMPLETED,
            payments: { status: client_1.PaymentStatus.PAID },
            review: null, // ✅ only forms without a review
        },
        select: {
            id: true,
            tour: { select: { title: true } },
            status: true,
            guide: { select: { name: true } },
            updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
    });
};
exports.requestedTourService = {
    requestTour,
    getRequestedTourForm,
    updateRequestedTourFormStatus,
    upcomingTours,
    canceledRequestedTours,
    completedRequestedTours,
    completedToursReviewProvide,
};
//# sourceMappingURL=requested-tour.service.js.map