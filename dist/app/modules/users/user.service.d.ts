import type { createAdminPayload, createGuidePayload, createTouristPayload } from "./user.interface";
import { type IPagination } from "../../middlewares/pagination";
import type { JwtPayload } from "jsonwebtoken";
import { UserStatus } from "@prisma/client";
export declare const userService: {
    createTourist: (payload: createTouristPayload) => Promise<{
        email: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        profilePhoto: string | null;
        contactNumber: string;
        address: string | null;
        gender: string | null;
        languages: string[];
    }>;
    createGuide: (payload: createGuidePayload) => Promise<{
        email: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        profilePhoto: string | null;
        contactNumber: string;
        address: string | null;
        gender: string | null;
        averageRating: number;
        languages: string[];
    }>;
    createAdmin: (payload: createAdminPayload) => Promise<{
        email: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        profilePhoto: string | null;
        contactNumber: string;
        address: string | null;
        gender: string | null;
    }>;
    getAllUsers: (email: string, filters: any, options: IPagination) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: {
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            id: number;
            status: import("@prisma/client").$Enums.UserStatus;
            createdAt: Date;
        }[];
    }>;
    updateProfile: (token: JwtPayload, payload: any, file: Express.Multer.File | undefined) => Promise<{
        email?: string;
        id?: number;
        createdAt?: Date;
        updatedAt?: Date;
        name?: string;
        profilePhoto?: string | null;
        contactNumber?: string;
        address?: string | null;
        gender?: string | null;
    }>;
    updateProfileStatus: (id: number, payload: {
        status: UserStatus;
    }) => Promise<{
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        id: number;
        password: string;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUser: (id: number) => Promise<{
        email: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        profilePhoto: string | null;
        contactNumber: string;
        address: string | null;
        gender: string | null;
    } | undefined>;
    guidesLanguages: () => Promise<string[]>;
    getGuides: (filters: any, options: IPagination) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: {
            email: string;
            name: string;
            profilePhoto: string | null;
            gender: string | null;
            averageRating: number;
            languages: string[];
            tours: {
                title: string;
                categoryId: number;
                destination: string;
            }[];
        }[];
    }>;
};
//# sourceMappingURL=user.service.d.ts.map