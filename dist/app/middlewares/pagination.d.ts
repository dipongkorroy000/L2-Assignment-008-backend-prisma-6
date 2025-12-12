export type IPagination = {
    page?: string | number;
    limit?: string | number;
    sortBy?: string;
    sortOrder?: string;
};
export type IOptions = {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
};
export declare const pagination: (options: IPagination) => IOptions;
//# sourceMappingURL=pagination.d.ts.map