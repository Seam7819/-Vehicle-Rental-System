import { Request, Response } from 'express';
import * as VehicleService from './vehicle.service';

export const create = async (req: Request, res: Response) => {
  const result = await VehicleService.createVehicle(req.body);
  res.status(201).json(result.rows[0]);
};
