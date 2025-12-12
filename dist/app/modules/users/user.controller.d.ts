import type { NextFunction, Request, Response } from "express";
export declare const userController: {
    createTourist: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createGuide: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createAdmin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProfileStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=user.controller.d.ts.map