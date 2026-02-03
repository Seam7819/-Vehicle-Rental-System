import { Request, Response } from "express";
import * as VehicleService from "./vehicle.service";

export const addVehicle = async (req:Request, res:Response) => {
  const vehicle = await VehicleService.createVehicle(req.body);
  res.status(201).json({ success: true, message: "Vehicle added", data: vehicle });
};

export const getVehicles = async (_req:Request, res:Response) => {
  const vehicles = await VehicleService.getAllVehicles();
  res.json({ success: true, data: vehicles });
};

export const getVehicle = async (req:Request, res:Response) => {
  const vehicle = await VehicleService.getVehicleById(req.params.vehicleId as string);
  res.json({ success: true, data: vehicle });
};

export const updateVehicle = async (req:Request, res:Response) => {
  const vehicle = await VehicleService.updateVehicle(req.params.vehicleId as string, req.body);
  res.json({ success: true, message: "Vehicle updated", data: vehicle });
};

export const removeVehicle = async (req:Request, res:Response) => {
  await VehicleService.deleteVehicle(req.params.vehicleId as string);
  res.json({ success: true, message: "Vehicle deleted" });
};
