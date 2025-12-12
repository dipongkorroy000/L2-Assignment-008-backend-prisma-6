export declare const messageService: {
    createMessage: (payload: any) => Promise<{
        email: string;
        id: number;
        name: string;
        message: string;
    }>;
    getMessages: () => Promise<{
        email: string;
        id: number;
        name: string;
        message: string;
    }[]>;
};
//# sourceMappingURL=message.service.d.ts.map