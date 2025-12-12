import type { NextFunction, Request, Response } from "express";
export declare const tourController: {
    createTour: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllTours: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTourById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getToursByGuide: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateTourByGuide: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateTourStatusByGuide: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteTour: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=tour.controller.d.ts.map