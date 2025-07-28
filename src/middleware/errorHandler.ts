import { Request, Response, NextFunction } from "express";
import { ResponseHelper } from "../helper/response.helper";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    res.status(statusCode).json(ResponseHelper.error(message, statusCode));
}