import { pool } from '../../config/db';
import { hashPassword, comparePassword } from '../../utils/bcrypt';
import { generateToken } from '../../utils/jwt';

export const signup = async (data: any) => {
  const hashed = await hashPassword(data.password);
  const result = await pool.query(
    `INSERT INTO users(name,email,password,phone,role)
     VALUES($1,$2,$3,$4,'customer') RETURNING id,role`,
    [data.name, data.email, hashed, data.phone]
  );
  return result.rows[0];
};

export const signin = async (email: string, password: string) => {
  const user = await pool.query(
    'SELECT * FROM users WHERE email=$1',
    [email]
  );
  if (!user.rows.length) throw new Error('Invalid credentials');

  const valid = await comparePassword(password, user.rows[0].password);
  if (!valid) throw new Error('Invalid credentials');

  return generateToken({
    id: user.rows[0].id,
    role: user.rows[0].role,
  });
};
