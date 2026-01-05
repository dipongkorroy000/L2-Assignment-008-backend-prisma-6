"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const prisma_1 = require("../../shared/prisma");
const createCategory = async (payload) => {
    return await prisma_1.prisma.category.create({ data: { title: payload.title } });
};
const getAllCategory = async () => {
    const categories = await prisma_1.prisma.category.findMany({
        select: {
            id: true,
            title: true,
            _count: {
                select: { tour: true },
            },
        },
    });
    return categories.map((cat) => ({
        id: cat.id,
        title: cat.title,
        tourCount: cat._count.tour,
    }));
};
const getAllCategoryWithTours = async () => {
    return await prisma_1.prisma.category.findMany({ select: { title: true, id: true, tour: { where: { isActive: true } } } });
};
const deleteCategory = async (id) => {
    await prisma_1.prisma.category.delete({ where: { id } });
    return null;
};
exports.categoryService = { createCategory, getAllCategory, getAllCategoryWithTours, deleteCategory };
//# sourceMappingURL=category.service.js.map