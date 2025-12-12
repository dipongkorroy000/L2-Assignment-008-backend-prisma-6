import {prisma} from "../../shared/prisma";

const createMessage = async (payload: any) => {
  const message = await prisma.message.create({data: payload});
  return message;
};

const getMessages = async () => {
  return await prisma.message.findMany();
};

export const messageService = {createMessage, getMessages};
