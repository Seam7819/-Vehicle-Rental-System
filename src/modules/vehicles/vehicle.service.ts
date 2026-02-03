import { pool } from '../../config/db';

export const createVehicle = (data: any) =>
  pool.query(
    `INSERT INTO vehicles(vehicle_name,type,registration_number,
     daily_rent_price,availability_status)
     VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [
      data.vehicle_name,
      data.type,
      data.registration_number,
      data.daily_rent_price,
      data.availability_status,
    ]
  );
