import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error("ERROR:", err);

    // default status
    const statusCode = err.statusCode || 500;

    // default message
    const message = err.message || "Terjadi kesalahan pada server";

    return res.status(statusCode).json({
        success: false,
        message,
        data: null,
    });
};