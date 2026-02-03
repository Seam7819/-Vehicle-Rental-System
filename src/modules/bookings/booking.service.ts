import { pool } from '../../config/db';
import { calculateDays } from '../../utils/date';

export const createBooking = async (
  data: any,
  user: { id: number; role: string }
) => {
  const vehicle = await pool.query(
    'SELECT * FROM vehicles WHERE id=$1 AND availability_status=$2',
    [data.vehicle_id, 'available']
  );

  if (!vehicle.rows.length) {
    throw new Error('Vehicle not available');
  }

  const days = calculateDays(
    data.rent_start_date,
    data.rent_end_date
  );

  if (days <= 0) throw new Error('Invalid date range');

  const totalPrice = days * vehicle.rows[0].daily_rent_price;

  const booking = await pool.query(
    `INSERT INTO bookings
     (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES($1,$2,$3,$4,$5,'active')
     RETURNING *`,
    [
      user.id,
      data.vehicle_id,
      data.rent_start_date,
      data.rent_end_date,
      totalPrice,
    ]
  );

  await pool.query(
    'UPDATE vehicles SET availability_status=$1 WHERE id=$2',
    ['booked', data.vehicle_id]
  );

  return booking.rows[0];
};

export const getBookings = async (user: {
  id: number;
  role: string;
}) => {
  if (user.role === 'admin') {
    const result = await pool.query('SELECT * FROM bookings');
    return result.rows;
  }

  const result = await pool.query(
    'SELECT * FROM bookings WHERE customer_id=$1',
    [user.id]
  );
  return result.rows;
};

export const updateBookingStatus = async (
  bookingId: number,
  user: { id: number; role: string }
) => {
  const booking = await pool.query(
    'SELECT * FROM bookings WHERE id=$1',
    [bookingId]
  );

  if (!booking.rows.length) {
    throw new Error('Booking not found');
  }

  const record = booking.rows[0];

  if (user.role === 'customer') {
    if (record.customer_id !== user.id) {
      throw new Error('Forbidden');
    }

    if (new Date(record.rent_start_date) <= new Date()) {
      throw new Error('Cannot cancel after start date');
    }

    await pool.query(
      'UPDATE bookings SET status=$1 WHERE id=$2',
      ['cancelled', bookingId]
    );
  }

  if (user.role === 'admin') {
    await pool.query(
      'UPDATE bookings SET status=$1 WHERE id=$2',
      ['returned', bookingId]
    );

    await pool.query(
      'UPDATE vehicles SET availability_status=$1 WHERE id=$2',
      ['available', record.vehicle_id]
    );
  }
};
