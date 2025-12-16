"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const config_1 = __importDefault(require("../../../config"));
const imageFileUploader_1 = require("../../utils/imageFileUploader");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const pagination_1 = require("../../middlewares/pagination");
const client_1 = require("@prisma/client");
const prisma_1 = require("../../shared/prisma");
const createTourist = async (payload) => {
    const hashPass = await bcryptjs_1.default.hash(payload.password, Number(config_1.default.BCRYPT_SALT_ROUND));
    const result = await prisma_1.prisma.$transaction(async (tnx) => {
        await tnx.user.create({ data: { email: payload.tourist.email, password: hashPass, role: client_1.UserRole.TOURIST } });
        return await tnx.tourist.create({ data: payload.tourist });
    });
    return result;
};
const createGuide = async (payload) => {
    const hashPass = await bcryptjs_1.default.hash(payload.password, Number(config_1.default.BCRYPT_SALT_ROUND));
    const result = await prisma_1.prisma.$transaction(async (tnx) => {
        await tnx.user.create({ data: { email: payload.guide.email, password: hashPass, role: client_1.UserRole.GUIDE } });
        return await tnx.guide.create({ data: payload.guide });
    });
    return result;
};
const createAdmin = async (payload) => {
    const hashPass = await bcryptjs_1.default.hash(payload.password, Number(config_1.default.BCRYPT_SALT_ROUND));
    const result = await prisma_1.prisma.$transaction(async (tnx) => {
        await tnx.user.create({ data: { email: payload.admin.email, password: hashPass, role: client_1.UserRole.ADMIN } });
        return await tnx.admin.create({ data: payload.admin });
    });
    return result;
};
const getAllUsers = async (email, filters, options) => {
    const { searchTerm, ...filterData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.pagination)(options);
    await prisma_1.prisma.user.findFirstOrThrow({ where: { email, status: client_1.UserStatus.ACTIVE, role: client_1.UserRole.ADMIN } });
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({ OR: ["email"].map((field) => ({ [field]: { contains: searchTerm, mode: "insensitive" } })) });
    }
    if (Object.keys(filterData.length > 0)) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({ [key]: { equals: filterData[key] } })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = await prisma_1.prisma.user.findMany({
        skip: skip,
        take: limit,
        where: { AND: whereConditions },
        orderBy: sortOrder && sortBy ? { [sortBy]: sortOrder } : { createdAt: "desc" },
        select: { id: true, email: true, role: true, status: true, createdAt: true },
    });
    const total = await prisma_1.prisma.user.count({ where: { AND: andConditions } });
    return { meta: { page, limit, total }, data: result };
};
const updateProfile = async (token, payload, file) => {
    const userInfo = await prisma_1.prisma.user.findUniqueOrThrow({ where: { email: token?.email, status: client_1.UserStatus.ACTIVE } });
    if (file) {
        const uploadToCloudinary = await imageFileUploader_1.imageFileUploader.uploadToCloudinary(file);
        payload.profilePhoto = uploadToCloudinary?.secure_url;
    }
    let profileInfo;
    if (userInfo.role === client_1.UserRole.ADMIN) {
        const { languages, ...data } = payload;
        profileInfo = await prisma_1.prisma.admin.update({ where: { email: userInfo.email }, data: data });
    }
    else if (userInfo.role === client_1.UserRole.GUIDE) {
        const guideProfile = await prisma_1.prisma.guide.findUniqueOrThrow({ where: { email: userInfo.email } });
        // ✅ Merge new language into existing array
        if (payload.languages) {
            const existingLanguages = guideProfile.languages || [];
            const newLanguages = Array.isArray(payload.languages) ? payload.languages : [payload.languages];
            const mergedLanguages = Array.from(new Set([...existingLanguages, ...newLanguages]));
            payload.languages = mergedLanguages;
        }
        profileInfo = await prisma_1.prisma.guide.update({ where: { email: userInfo.email }, data: payload });
    }
    else if (userInfo.role === client_1.UserRole.TOURIST) {
        const touristProfile = await prisma_1.prisma.tourist.findUniqueOrThrow({ where: { email: userInfo.email } });
        if (payload.languages) {
            const existingLanguages = touristProfile.languages || [];
            const newLanguages = Array.isArray(payload.languages) ? payload.languages : [payload.languages];
            payload.languages = Array.from(new Set([...existingLanguages, ...newLanguages]));
        }
        profileInfo = await prisma_1.prisma.tourist.update({ where: { email: userInfo.email }, data: payload });
    }
    return { ...profileInfo };
};
const updateProfileStatus = async (id, payload) => {
    await prisma_1.prisma.user.findUniqueOrThrow({ where: { id } });
    return await prisma_1.prisma.user.update({ where: { id }, data: { status: payload.status } });
};
const getUser = async (id) => {
    const user = await prisma_1.prisma.user.findUniqueOrThrow({ where: { id } });
    if (user.role === client_1.UserRole.ADMIN)
        return await prisma_1.prisma.admin.findUniqueOrThrow({ where: { email: user.email } });
    else if (user.role === client_1.UserRole.GUIDE)
        return await prisma_1.prisma.guide.findUniqueOrThrow({ where: { email: user.email } });
    else if (user.role === client_1.UserRole.TOURIST)
        return await prisma_1.prisma.tourist.findUniqueOrThrow({ where: { email: user.email } });
};
exports.userService = { createTourist, createGuide, createAdmin, getAllUsers, updateProfile, updateProfileStatus, getUser };
//# sourceMappingURL=user.service.js.map