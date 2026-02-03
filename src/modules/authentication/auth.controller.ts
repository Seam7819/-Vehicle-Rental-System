import { Request, Response } from 'express';
import * as AuthService from './auth.service';

export const signup = async (req: Request, res: Response) => {
  const user = await AuthService.signup(req.body);
  res.status(201).json(user);
};

export const signin = async (req: Request, res: Response) => {
  const token = await AuthService.signin(
    req.body.email,
    req.body.password
  );
  res.json({ token });
};
