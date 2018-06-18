import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

import logger from './logger';
import routes from './routes/routes';

const PORT = 3000;

const koa = new Koa();
const router = new Router();

koa.use(bodyParser());
koa.use(routes.routes());
koa.listen(PORT);
logger.info(`Koa listening on port ${PORT}`);
