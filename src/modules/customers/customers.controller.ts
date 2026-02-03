import { Request, Response } from 'express';
import * as UserService from './customers.service';

export const getAll = async (_: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  res.json(users);
};

export const update = async (req: Request, res: Response) => {
  const updated = await UserService.updateUser(
    Number(req.params.userId),
    req.body,
    req.user
  );
  res.json(updated);
};

export const remove = async (req: Request, res: Response) => {
  await UserService.deleteUser(Number(req.params.userId));
  res.json({ message: 'User deleted successfully' });
};
