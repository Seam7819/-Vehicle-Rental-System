import jwt from 'jsonwebtoken';
import config from '../config';

export const generateToken = (payload: object) =>
  jwt.sign(payload, config.jwtSecret, { expiresIn: '1d' });
