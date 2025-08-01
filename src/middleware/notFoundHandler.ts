import { Request, Response, NextFunction } from "express";

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
    const error = new Error(`Route ${req.originalUrl} not found`);
    (error as any).statusCode = 404;
    next(error); 
}