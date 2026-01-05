export declare const categoryService: {
    createCategory: (payload: {
        title: string;
    }) => Promise<{
        id: number;
        title: string;
    }>;
    getAllCategory: () => Promise<{
        id: number;
        title: string;
        tourCount: number;
    }[]>;
    getAllCategoryWithTours: () => Promise<{
        id: number;
        tour: {
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
        }[];
        title: string;
    }[]>;
    deleteCategory: (id: number) => Promise<null>;
};
//# sourceMappingURL=category.service.d.ts.map