import {prisma} from "../../shared/prisma";

const createCategory = async (payload: {title: string}) => {
  return await prisma.category.create({data: {title: payload.title}});
};

const getAllCategory = async () => {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      title: true,
      _count: {
        select: {tour: true},
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
  return await prisma.category.findMany({select: {title: true, id: true, tour: {where: {isActive: true}}}});
};

const deleteCategory = async (id: number) => {
  await prisma.category.delete({where: {id}});
  return null;
};

export const categoryService = {createCategory, getAllCategory, getAllCategoryWithTours , deleteCategory};
