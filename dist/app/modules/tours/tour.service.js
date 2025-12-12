"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourService = void 0;
const ServerError_1 = __importDefault(require("../../errors/ServerError"));
const pagination_1 = require("../../middlewares/pagination");
const prisma_1 = require("../../shared/prisma");
const imageFileUploader_1 = require("../../utils/imageFileUploader");
const createTour = async (email, payload, file) => {
    const guide = await prisma_1.prisma.guide.findUniqueOrThrow({ where: { email } });
    if (file) {
        if (file.size > 400 * 1024) {
            throw new ServerError_1.default(400, "Image file size must be below 400KB");
        }
        const uploadToCloudinary = await imageFileUploader_1.imageFileUploader.uploadToCloudinary(file);
        payload.image = uploadToCloudinary?.secure_url;
    }
    return await prisma_1.prisma.tour.create({
        data: { guideId: guide.id, ...payload },
    });
};
const getAllTours = async (filters, options) => {
    const { searchTerm, categoryId, ...filterData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.pagination)(options);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({ OR: ["title", "description"].map((field) => ({ [field]: { contains: searchTerm, mode: "insensitive" } })) });
    }
    if (categoryId) {
        // Convert to array if single string
        const specialtiesArray = Array.isArray(categoryId) ? categoryId : [categoryId];
        andConditions.push({
            categoryId: Number(categoryId),
        });
    }
    if (Object.keys(filterData.length > 0)) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({ [key]: { equals: filterData[key] } })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = await prisma_1.prisma.tour.findMany({
        skip: skip,
        take: limit,
        where: { AND: whereConditions, isActive: true },
        select: {
            id: true,
            title: true,
            averageRating: true,
            groupMembers: true,
            requestForm: { include: { review: { select: { comment: true, rating: true } }, tourist: { select: { email: true } } } },
            image: true,
            category: true,
            duration: true,
            createdAt: true,
            guide: { select: { languages: true } },
        },
        orderBy: sortOrder && sortBy ? { [sortBy]: sortOrder } : { createdAt: "desc" },
    });
    const total = await prisma_1.prisma.tour.count({ where: { AND: andConditions } });
    return { meta: { page, limit, total }, data: result };
};
const getTourById = async (id) => {
    const tour = await prisma_1.prisma.tour.findUnique({
        where: { id },
        select: {
            guide: {
                select: { email: true, contactNumber: true, profilePhoto: true, averageRating: true, languages: true, name: true },
            },
            averageRating: true,
            createdAt: true,
            category: true,
            city: true,
            description: true,
            destination: true,
            duration: true,
            groupMembers: true,
            image: true,
            meetingPoint: true,
            title: true,
            requestForm: { include: { review: { select: { comment: true, rating: true } }, tourist: { select: { email: true } } } },
        },
    });
    return tour;
};
const getToursByGuide = async (filters, options, email) => {
    const guide = await prisma_1.prisma.guide.findUnique({ where: { email } });
    if (!guide)
        throw new Error("Guide not found");
    // const tours = await prisma.tour.findMany({where: {guideId: guide.id}});
    // return tours;
    const { searchTerm, ...filterData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.pagination)(options);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({ OR: ["title", "description"].map((field) => ({ [field]: { contains: searchTerm, mode: "insensitive" } })) });
    }
    if (Object.keys(filterData.length > 0)) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({ [key]: { equals: filterData[key] } })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = await prisma_1.prisma.tour.findMany({
        skip: skip,
        take: limit,
        where: { AND: { ...whereConditions, guideId: guide.id } },
        select: {
            id: true,
            title: true,
            averageRating: true,
            groupMembers: true,
            duration: true,
            createdAt: true,
            isActive: true,
            city: true,
            tourFee: true,
            guide: {
                select: {
                    languages: true,
                },
            },
            image: true,
            category: true,
        },
        orderBy: sortOrder && sortBy ? { [sortBy]: sortOrder } : { createdAt: "desc" },
    });
    const total = await prisma_1.prisma.tour.count({ where: { AND: andConditions } });
    return { meta: { page, limit, total }, data: result };
};
const updateTourByGuide = async (email, id, payload) => {
    const guide = await prisma_1.prisma.guide.findUniqueOrThrow({ where: { email: email } });
    const updatedTour = await prisma_1.prisma.tour.update({
        where: { id, guideId: guide.id },
        data: {
            title: payload.title,
            city: payload.city,
            categoryId: payload.category.id,
            destination: payload.destination,
            duration: payload.duration,
            groupMembers: payload.groupMembers,
            meetingPoint: payload.meetingPoint,
            description: payload.description,
        },
    });
    return updatedTour;
};
const updateTourStatusByGuide = async (email, id) => {
    const tour = await prisma_1.prisma.tour.findUnique({ where: { id } });
    if (!tour)
        throw new Error("Tour not found");
    if (tour.guideId !== (await prisma_1.prisma.guide.findUnique({ where: { email } }))?.id) {
        throw new Error("Unauthorized");
    }
    const updatedTour = await prisma_1.prisma.tour.update({ where: { id }, data: { isActive: !tour.isActive } });
    return updatedTour;
};
const deleteTour = async (email, id) => {
    const userid = await prisma_1.prisma.guide.findUniqueOrThrow({ where: { email } });
    return await prisma_1.prisma.tour.delete({ where: { id, guideId: userid.id } });
};
exports.tourService = { createTour, getAllTours, getTourById, getToursByGuide, updateTourByGuide, updateTourStatusByGuide, deleteTour };
//# sourceMappingURL=tour.service.js.map