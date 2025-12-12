import type { NextFunction, Request, Response } from "express";
export declare const requestedTourController: {
    requestTour: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getRequestedTourForm: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateRequestedTourFormStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    upcomingTours: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    canceledRequestedTours: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    completedRequestedTours: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    completedToursReviewProvide: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=requested-tour.controller.d.ts.map