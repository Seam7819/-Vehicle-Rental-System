import { pool } from "../../config/db";

export const getUsers = async () => {
  const result = await pool.query("SELECT id,name,email,phone,role FROM users");
  return result.rows;
};

export const updateUser = async (id: string, data) => {
  const result = await pool.query(
    `UPDATE users SET name=$1, phone=$2, role=$3 WHERE id=$4 RETURNING *`,
    [data.name, data.phone, data.role, id]
  );
  return result.rows[0];
};

export const deleteUser = async (id: string) => {
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
};
