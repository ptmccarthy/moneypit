import * as Router from 'koa-router';

import { db } from '../db/db';
import logger from '../logger';

const routes = new Router();

routes
  .get('/', async (ctx) => {
    const { id } = ctx.params;
    const { rows } = await db.query('SELECT * from cars', []);
    ctx.body = rows;
  });

export default routes;
