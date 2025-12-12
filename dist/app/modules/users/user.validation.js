"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
const createTouristValidationSchema = zod_1.default.object({
    password: zod_1.default.string(),
    tourist: zod_1.default.object({
        name: zod_1.default.string().nonempty("Name is required"),
        email: zod_1.default.string().nonempty("Email is required"),
        address: zod_1.default.string().optional(),
        contactNumber: zod_1.default.string().min(11).nonempty("Contact Number is required"),
        gender: zod_1.default.enum([client_1.Gender.MALE, client_1.Gender.FEMALE]),
    }),
});
const createGuideValidationSchema = zod_1.default.object({
    password: zod_1.default.string(),
    guide: zod_1.default.object({
        name: zod_1.default.string().nonempty("Name is required"),
        email: zod_1.default.string().nonempty("Email is required"),
        address: zod_1.default.string().optional(),
        contactNumber: zod_1.default.string().min(11).nonempty("Contact Number is required"),
        gender: zod_1.default.enum([client_1.Gender.MALE, client_1.Gender.FEMALE]),
    }),
});
const createAdminValidationSchema = zod_1.default.object({
    password: zod_1.default.string(),
    admin: zod_1.default.object({
        name: zod_1.default.string().nonempty("Name is required"),
        email: zod_1.default.string().nonempty("Email is required"),
        address: zod_1.default.string().optional(),
        contactNumber: zod_1.default.string().min(11).nonempty("Contact Number is required"),
        gender: zod_1.default.enum([client_1.Gender.MALE, client_1.Gender.FEMALE]),
    }),
});
exports.userValidation = { createTouristValidationSchema, createGuideValidationSchema, createAdminValidationSchema };
//# sourceMappingURL=user.validation.js.map