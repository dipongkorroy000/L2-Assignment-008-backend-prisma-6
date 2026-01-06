import { type IPagination } from "../../middlewares/pagination";
export declare const tourService: {
    createTour: (email: string, payload: any, file: Express.Multer.File | undefined) => Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        averageRating: number;
        title: string;
        description: string;
        tourFee: number;
        groupMembers: number;
        categoryId: number;
        duration: string;
        meetingPoint: string;
        destination: string;
        city: string;
        image: string;
        isActive: boolean;
        guideId: number;
    }>;
    getAllTours: (filters: any, options: IPagination) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: {
            id: number;
            createdAt: Date;
            guide: {
                languages: string[];
            };
            averageRating: number;
            requestForm: ({
                tourist: {
                    email: string;
                };
                review: {
                    comment: string | null;
                    rating: number;
                } | null;
            } & {
                id: number;
                status: import("@prisma/client").$Enums.RequestFormStatus;
                createdAt: Date;
                updatedAt: Date;
                guideId: number;
                tourId: number;
                touristId: number;
                tourDate: Date;
                comment: string;
            })[];
            category: {
                id: number;
                title: string;
            };
            title: string;
            groupMembers: number;
            duration: string;
            destination: string;
            image: string;
            isActive: boolean;
        }[];
    }>;
    getTourById: (id: number) => Promise<{
        createdAt: Date;
        guide: {
            email: string;
            id: number;
            name: string;
            profilePhoto: string | null;
            contactNumber: string;
            averageRating: number;
            languages: string[];
        };
        averageRating: number;
        requestForm: ({
            tourist: {
                email: string;
            };
            review: {
                comment: string | null;
                rating: number;
            } | null;
        } & {
            id: number;
            status: import("@prisma/client").$Enums.RequestFormStatus;
            createdAt: Date;
            updatedAt: Date;
            guideId: number;
            tourId: number;
            touristId: number;
            tourDate: Date;
            comment: string;
        })[];
        category: {
            id: number;
            title: string;
        };
        title: string;
        description: string;
        groupMembers: number;
        duration: string;
        meetingPoint: string;
        destination: string;
        city: string;
        image: string;
    } | null>;
    getToursByGuide: (filters: any, options: IPagination, email: string) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: {
            id: number;
            createdAt: Date;
            guide: {
                languages: string[];
            };
            averageRating: number;
            category: {
                id: number;
                title: string;
            };
            title: string;
            tourFee: number;
            groupMembers: number;
            duration: string;
            city: string;
            image: string;
            isActive: boolean;
        }[];
    }>;
    updateTourByGuide: (email: string, id: number, payload: {
        title: string;
        city: string;
        category: {
            id: number;
            title: string;
        };
        destination: string;
        duration: string;
        groupMembers: number;
        meetingPoint: string;
        description: string;
    }) => Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        averageRating: number;
        title: string;
        description: string;
        tourFee: number;
        groupMembers: number;
        categoryId: number;
        duration: string;
        meetingPoint: string;
        destination: string;
        city: string;
        image: string;
        isActive: boolean;
        guideId: number;
    }>;
    updateTourStatusByGuide: (email: string, id: number) => Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        averageRating: number;
        title: string;
        description: string;
        tourFee: number;
        groupMembers: number;
        categoryId: number;
        duration: string;
        meetingPoint: string;
        destination: string;
        city: string;
        image: string;
        isActive: boolean;
        guideId: number;
    }>;
    deleteTour: (email: string, id: number) => Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        averageRating: number;
        title: string;
        description: string;
        tourFee: number;
        groupMembers: number;
        categoryId: number;
        duration: string;
        meetingPoint: string;
        destination: string;
        city: string;
        image: string;
        isActive: boolean;
        guideId: number;
    }>;
    getAISuggestions: (payload: {
        preferences: string;
    }) => Promise<any>;
};
//# sourceMappingURL=tour.service.d.ts.map