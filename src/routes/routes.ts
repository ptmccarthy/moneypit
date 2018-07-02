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
    const { ...params } = ctx.request.body;

    let newCar = new Car();

    newCar = Object.assign(newCar, params);

    try {
      await newCar.save();
      ctx.status = 200;
    } catch (e) {
      ctx.body = e;
    }
  });

export default routes;
