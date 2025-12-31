export declare const statsService: {
    adminStats: (email: string) => Promise<{
        meta: {
            admins: number;
            tourists: number;
            guides: number;
            tours: number;
            totalPayments: number;
            totalEarning: number;
        };
    }>;
    guideStats: (email: string) => Promise<{
        meta: {
            completedTours: number;
            totalEarning: number;
        };
    }>;
    toursStatsForChart: () => Promise<{
        totalTours: number;
        completedTours: number;
        totalGuides: number;
        totalTourists: number;
    }>;
};
//# sourceMappingURL=stats.service.d.ts.map