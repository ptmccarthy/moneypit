import * as Router from 'koa-router';
import logger from '../logger';

import { Car } from '../entity/car';

const routes = new Router();
const car = new Car();

routes
  .use('*', async (ctx, next) => {
    logger.info(`${ctx.method} ${ctx.request.url} ${JSON.stringify(ctx.request.body)}`);
    return next();
  })

  .get('/', async (ctx) => {
    const allCars = await Car.find();
    ctx.body = allCars;
  })

  .post('/create', async (ctx) => {
    const name = ctx.request.body.name;
    const newCar = new Car();

    newCar.name = name;

    if (name) {
      const res = await newCar.save();
      ctx.status = 200;
    } else {
      ctx.status = 400;
    }
  })

export default routes;
