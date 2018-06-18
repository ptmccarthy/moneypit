import * as Router from 'koa-router';

import { db } from '../db/db';
import logger from '../logger';

const routes = new Router();

routes
  .use('*', async (ctx, next) => {
    logger.info(`${ctx.method} ${ctx.request.url} ${JSON.stringify(ctx.request.body)}`);
    return next();
  })

  .get('/', async (ctx) => {
    const { rows } = await db.query('SELECT * from cars', []);
    ctx.body = rows;
  })

  .post('/create', async (ctx) => {
    const name = ctx.request.body.name;

    if (name) {
      const res = await db.query('INSERT INTO cars VALUES ($1)', [name]);
      ctx.status = 200;
    } else {
      ctx.status = 400;
    }
  })

export default routes;
