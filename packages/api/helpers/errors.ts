import { NextFunction, Request, Response } from "express";

export interface CustomError {
    status?: number;
    message: string;
}

export function errorHandler(error: CustomError, _request: Request, response: Response, _next: NextFunction) {
    return response.status(error.status || 500).json({
        error: {
            message: error.message || "Something went wrong.",
        },
    });
}