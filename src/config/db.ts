import { Pool } from 'pg';
import config from './index';

export const pool = new Pool(config.db);

pool.on('connect', () => {
  console.log('✅ PostgreSQL connected');
});
