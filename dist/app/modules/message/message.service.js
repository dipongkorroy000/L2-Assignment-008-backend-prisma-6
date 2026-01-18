"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageService = void 0;
const prisma_1 = require("../../shared/prisma");
const createMessage = async (payload) => {
    const message = await prisma_1.prisma.message.create({ data: payload });
    return message;
};
const getMessages = async () => {
    return await prisma_1.prisma.message.findMany();
};
exports.messageService = { createMessage, getMessages };
//# sourceMappingURL=message.service.js.map