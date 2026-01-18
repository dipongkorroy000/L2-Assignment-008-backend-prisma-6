import type { NextFunction, Request, Response } from "express";
export declare const authController: {
    login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    passwordUpdate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    userProfileStatusUpdate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=auth.controller.d.ts.map