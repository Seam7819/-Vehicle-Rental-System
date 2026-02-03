import { Response } from "express";

export const success = (res:Response, status, message, data = null) =>
  res.status(status).json({ success: true, message, data });

export const error = (res:Response, status, message) =>
  res.status(status).json({ success: false, message, errors: message });
