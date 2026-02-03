import { pool } from '../../config/db';

export const getAllUsers = async () => {
  const result = await pool.query(
    'SELECT id, name, email, phone, role FROM users'
  );
  return result.rows;
};

export const getUserById = async (id: number) => {
  const result = await pool.query(
    'SELECT id, name, email, phone, role FROM users WHERE id=$1',
    [id]
  );
  return result.rows[0];
};

export const updateUser = async (
  targetUserId: number,
  data: any,
  requester: { id: number; role: string }
) => {
  if (requester.role !== 'admin' && requester.id !== targetUserId) {
    throw new Error('Forbidden');
  }

  const result = await pool.query(
    `UPDATE users
     SET name=$1, phone=$2, role=COALESCE($3, role)
     WHERE id=$4
     RETURNING id,name,email,phone,role`,
    [data.name, data.phone, data.role, targetUserId]
  );

  return result.rows[0];
};

export const deleteUser = async (userId: number) => {
  const activeBooking = await pool.query(
    `SELECT 1 FROM bookings
     WHERE customer_id=$1 AND status='active'`,
    [userId]
  );

  if (activeBooking.rows.length) {
    throw new Error('User has active bookings');
  }

  await pool.query('DELETE FROM users WHERE id=$1', [userId]);
};
