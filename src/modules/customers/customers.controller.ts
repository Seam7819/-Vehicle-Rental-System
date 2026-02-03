import { Request, Response } from "express";
import * as UserService from "./customers.service";

export const getAllUsers = async (_req:Request, res:Response) => {
  const users = await UserService.getUsers();
  res.json({ success: true, data: users });
};

export const updateUser = async (req:Request, res:Response) => {
  const user = await UserService.updateUser(req.params.userId as string, req.body);
  res.json({ success: true, message: "User updated", data: user });
};

export const removeUser = async (req:Request, res:Response) => {
  await UserService.deleteUser(req.params.userId as string);
  res.json({ success: true, message: "User deleted" });
};
