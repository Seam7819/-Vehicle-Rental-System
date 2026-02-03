import { pool } from "../../config/db";
import { hashPassword, comparePassword } from "../../utils/password";
import { generateToken } from "../../utils/jwt";

export const AuthService = {
  async signup(data) {
    const hashed = await hashPassword(data.password);
    const result = await pool.query(
      `INSERT INTO users (name,email,password,phone,role)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING id,name,email,phone,role`,
      [data.name, data.email.toLowerCase(), hashed, data.phone, data.role]
    );
    return result.rows[0];
  },

  async signin(data) {
    const result = await pool.query(
      `SELECT * FROM users WHERE email=$1`,
      [data.email.toLowerCase()]
    );

    if (!result.rows.length) throw new Error("Invalid credentials");

    const user = result.rows[0];
    const valid = await comparePassword(data.password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    return {
      token: generateToken({ id: user.id, role: user.role }),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    };
  },
};
