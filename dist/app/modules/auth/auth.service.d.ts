import type { Login } from "./auth.interface";
export declare const authService: {
    login: (payload: Login) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getProfile: (email: string) => Promise<{
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        id: number;
        status: import("@prisma/client").$Enums.UserStatus;
        admin: {
            email: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            profilePhoto: string | null;
            contactNumber: string;
            address: string | null;
            gender: string | null;
        } | null;
        guide: {
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
        } | null;
        tourist: {
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
        } | null;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map