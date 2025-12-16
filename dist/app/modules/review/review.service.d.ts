export declare const reviewsService: {
    getReviews: (email: string) => Promise<({
        review: {
            updatedAt: Date;
            comment: string | null;
            rating: number;
        } | null;
        tour: {
            title: string;
        };
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
    })[]>;
    createReview: (requestedFormId: number, payload: {
        comment: string;
        rating: number;
    }) => Promise<{
        success: boolean;
        averageRating: number;
    }>;
};
//# sourceMappingURL=review.service.d.ts.map