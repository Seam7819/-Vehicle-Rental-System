import { AuthService } from "./auth.service";
import { success, error } from "../../utils/response";
import { Request, Response } from "express";

export const signup = async (req, res) => {
  try {
    success(res, 201, "User registered successfully", await AuthService.signup(req.body));
  } catch (e: any) {
    error(res, 400, e.message);
  }
};

export const signin = async (req:Request, res:Response) => {
  try {
    success(res, 200, "Login successful", await AuthService.signin(req.body));
  } catch (e: any) {
    error(res, 401, e.message);
  }
};
