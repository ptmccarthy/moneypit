import { Pool } from 'pg';
import logger from '../logger';

const pool = new Pool();

pool.connect()
  .then(() =>
    logger.info('Connected to postgresql')
  )
  .catch((error) =>
    logger.error('Failed to connect to postgresql', error)
  );
export const db = {

  query: (text, params) => pool.query(text, params)

}
