export declare const reviewsService: {
    getReviews: (email: string) => Promise<({
        review: {
            updatedAt: Date;
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
    })[]>;
    createReview: (email: string, requestedFormId: number, payload: {
        comment: string;
        rating: number;
    }) => Promise<void>;
};
//# sourceMappingURL=review.service.d.ts.map