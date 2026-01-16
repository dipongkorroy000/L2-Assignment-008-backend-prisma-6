import {Prisma, UserRole, UserStatus} from "@prisma/client";
import ServerError from "../../errors/ServerError";
import {pagination, type IPagination} from "../../middlewares/pagination";
import {prisma} from "../../shared/prisma";
import {imageFileUploader} from "../../utils/imageFileUploader";
import status from "http-status";
import {openai} from "../../utils/open-router";
import {aiJsonFromMessage} from "../../utils/aiJsonFromMessage";

const createTour = async (email: string, payload: any, file: Express.Multer.File | undefined) => {
  await prisma.user.findUniqueOrThrow({where: {email, status: UserStatus.ACTIVE}});

  const guide = await prisma.guide.findUniqueOrThrow({where: {email}});

  if (!file) throw new ServerError(400, "Image not provide");

  if (file) {
    if (file.size > 400 * 1024) {
      throw new ServerError(400, "Image file size must be below 400KB");
    }

    const uploadToCloudinary = await imageFileUploader.uploadToCloudinary(file);
    payload.image = uploadToCloudinary?.secure_url;
  }

  return await prisma.tour.create({
    data: {guideId: guide.id, ...payload},
  });
};

const getAllTours = async (filters: any, options: IPagination) => {
  const {searchTerm, categoryId, price, ...filterData} = filters;
  const {page, limit, skip, sortBy, sortOrder} = pagination(options);

  const andConditions: Prisma.TourWhereInput[] = [];

  // 🔍 Search term filter
  if (searchTerm) {
    andConditions.push({
      OR: ["title", "description"].map((field) => ({
        [field]: {contains: searchTerm, mode: "insensitive"},
      })),
    });
  }

  // 📂 Category filter
  if (categoryId) {
    andConditions.push({categoryId: Number(categoryId)});
  }

  // 📝 Extra filters
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {equals: (filterData as any)[key]},
      })),
    });
  }

  // 💰 Price range filter
  if (price) {
    const [minFee, maxFee] = price.split(",").map(Number);
    if (!isNaN(minFee) && !isNaN(maxFee)) {
      andConditions.push({tourFee: {gte: minFee, lte: maxFee}});
    }
  }

  const whereConditions: Prisma.TourWhereInput = andConditions.length > 0 ? {AND: andConditions} : {};

  const result = await prisma.tour.findMany({
    skip,
    take: limit,
    where: {...whereConditions, isActive: true},
    select: {
      id: true,
      title: true,
      averageRating: true,
      groupMembers: true,
      requestForm: {
        include: {
          review: {select: {comment: true, rating: true}},
          tourist: {select: {email: true}},
        },
      },
      image: true,
      category: true,
      duration: true,
      createdAt: true,
      guide: {select: {languages: true}},
      isActive: true,
      destination: true,
      city: true,
      tourFee: true,
      _count: {select: {requestForm: true}},
    },
    orderBy: sortOrder && sortBy ? {[sortBy]: sortOrder} : {createdAt: "desc"},
  });

  const total = await prisma.tour.count({
    where: {...whereConditions, isActive: true},
  });

  const tourFee = await prisma.tour.aggregate({
    _min: {tourFee: true},
    _max: {tourFee: true},
  });

  return {
    meta: {page, limit, total, tourFee},
    data: result.map((tour) => ({...tour, totalRequestForm: tour._count.requestForm})),
  };
};

const getTourById = async (id: number) => {
  const tour = await prisma.tour.findUnique({
    where: {id},
    select: {
      guide: {
        select: {id: true, email: true, contactNumber: true, profilePhoto: true, averageRating: true, languages: true, name: true},
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
      requestForm: {include: {review: {select: {comment: true, rating: true}}, tourist: {select: {email: true}}}},
    },
  });

  return tour;
};

const getToursByGuide = async (filters: any, options: IPagination, email: string) => {
  const guide = await prisma.guide.findUnique({where: {email}});
  if (!guide) throw new Error("Guide not found");

  // const tours = await prisma.tour.findMany({where: {guideId: guide.id}});
  // return tours;

  const {searchTerm, ...filterData} = filters;
  const {page, limit, skip, sortBy, sortOrder} = pagination(options);

  const andConditions: Prisma.TourWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({OR: ["title", "description"].map((field) => ({[field]: {contains: searchTerm, mode: "insensitive"}}))});
  }

  if (Object.keys(filterData.length > 0)) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({[key]: {equals: (filterData as any)[key]}})),
    });
  }

  const whereConditions: Prisma.TourWhereInput = andConditions.length > 0 ? {AND: andConditions} : {};

  const result = await prisma.tour.findMany({
    skip: skip,
    take: limit,
    where: {AND: {...whereConditions, guideId: guide.id}},
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
    orderBy: sortOrder && sortBy ? {[sortBy]: sortOrder} : {createdAt: "desc"},
  });

  const total = await prisma.tour.count({where: {AND: andConditions, guideId: guide.id}});

  return {meta: {page, limit, total}, data: result};
};

const updateTourByGuide = async (
  email: string,
  id: number,
  payload: {
    title: string;
    city: string;
    category: {id: number; title: string};
    destination: string;
    duration: string;
    groupMembers: number;
    meetingPoint: string;
    description: string;
  }
) => {
  const guide = await prisma.guide.findUniqueOrThrow({where: {email: email}});

  const updatedTour = await prisma.tour.update({
    where: {id, guideId: guide.id},
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

const updateTourStatusByGuide = async (email: string, id: number) => {
  const tour = await prisma.tour.findUnique({where: {id}});
  if (!tour) throw new Error("Tour not found");

  const admin = await prisma.user.findUnique({where: {email}});
  if (admin?.role === UserRole.ADMIN) {
    return await prisma.tour.update({where: {id}, data: {isActive: !tour.isActive}});
  }

  if (tour.guideId !== (await prisma.guide.findUnique({where: {email}}))?.id) {
    throw new Error("Unauthorized");
  }

  return await prisma.tour.update({where: {id}, data: {isActive: !tour.isActive}});
};

const deleteTour = async (email: string, id: number) => {
  const userid = await prisma.guide.findUniqueOrThrow({where: {email}});
  return await prisma.tour.delete({where: {id, guideId: userid.id}});
};

const getAISuggestions = async (payload: {preferences: string}) => {
  if (!(payload && payload.preferences)) {
    throw new ServerError(status.BAD_REQUEST, "preferences is required!");
  }

  // Fetch active tours
  const tours = await prisma.tour.findMany({
    where: {isActive: true},
    include: {guide: true, category: true},
  });

  const prompt = `
  You are a travel assistant AI. Based on the user's preferences, suggest the top 3 most suitable tours. 
  Each tour has details like title, description, fee, duration, meeting point, destination, city, category, 
  and guide information (including name and profile). 
  Only suggest tours that are relevant to the given preferences. 
  Preferences: ${payload.preferences}
  
  Here is the tour list (in JSON):
  ${JSON.stringify(tours, null, 2)}
  
  Return your response in JSON format with full individual tour data (id, title, description, fee, duration, destination, city, category, guide, averageRating).
  `;

  const completion = await openai.chat.completions.create({
    model: "z-ai/glm-4.5-air:free",
    messages: [
      {
        role: "system",
        content: "You are a helpful AI travel assistant that provides tour suggestions.",
      },
      {role: "user", content: prompt},
    ],
  });

  return aiJsonFromMessage(completion.choices[0]?.message);
};

export const tourService = {
  createTour,
  getAllTours,
  getTourById,
  getToursByGuide,
  updateTourByGuide,
  updateTourStatusByGuide,
  deleteTour,
  getAISuggestions,
};
