import * as Router from 'koa-router';

import { db } from '../db/db';
import logger from '../logger';

const routes = new Router();

routes
  .get('/', async (ctx) => {
    logger.info('GET /');
    const { id } = ctx.params;
    const { rows } = await db.query('SELECT * from cars', []);
    ctx.body = rows;
  })

  .post('/create', async (ctx) => {
    logger.info('POST /create');
    const name = ctx.request.body.name;

    if (name) {
      const res = await db.query('INSERT INTO cars VALUES ($1)', [name]);
      ctx.status = 200;
    } else {
      ctx.status = 400;
    }
  })

export default routes;
