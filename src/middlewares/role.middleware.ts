import { NextFunction, Request, Response } from "express";

export const authorize =
    (...roles: string[]) =>
        (req: Request, res: Response, next: NextFunction) =>
            roles.includes(req.user.role)
                ? next()
                : res.status(403).json({ success: false, message: "Forbidden" });
