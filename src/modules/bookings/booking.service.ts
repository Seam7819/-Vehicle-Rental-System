import { pool } from "../../config/db";

export const createBooking = async (data, userId: string) => {
  const vehicle = await pool.query(
    "SELECT * FROM vehicles WHERE id=$1 AND availability_status='available'",
    [data.vehicle_id]
  );
  if (!vehicle.rows.length) throw new Error("Vehicle not available");

  const days =
    (new Date(data.rent_end_date).getTime() -
      new Date(data.rent_start_date).getTime()) /
    (1000 * 60 * 60 * 24);

  const total = days * vehicle.rows[0].daily_rent_price;

  const booking = await pool.query(
    `INSERT INTO bookings
     (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1,$2,$3,$4,$5,'active') RETURNING *`,
    [userId, data.vehicle_id, data.rent_start_date, data.rent_end_date, total]
  );

  await pool.query(
    "UPDATE vehicles SET availability_status='booked' WHERE id=$1",
    [data.vehicle_id]
  );

  return booking.rows[0];
};

export const getBookings = async (user) => {
  if (user.role === "admin") {
    return (await pool.query("SELECT * FROM bookings")).rows;
  }
  return (
    await pool.query("SELECT * FROM bookings WHERE customer_id=$1", [user.id])
  ).rows;
};

export const cancelBooking = async (id: string) => {
  const booking = await pool.query(
    "UPDATE bookings SET status='cancelled' WHERE id=$1 RETURNING *",
    [id]
  );
  return booking.rows[0];
};

export const returnBooking = async (id: string) => {
  const booking = await pool.query(
    "UPDATE bookings SET status='returned' WHERE id=$1 RETURNING *",
    [id]
  );
  await pool.query(
    "UPDATE vehicles SET availability_status='available' WHERE id=$1",
    [booking.rows[0].vehicle_id]
  );
  return booking.rows[0];
};

