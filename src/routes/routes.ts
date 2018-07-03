import * as Router from 'koa-router';
import * as passport from 'koa-passport';

import logger from '../logger';

import { Car } from '../entity/car';

const routes = new Router();
const car = new Car();

routes
  .use('*', async (ctx, next) => {
    logger.info(`${ctx.method} ${ctx.request.url} ${JSON.stringify(ctx.request.body)}`);
    return next();
  })

  .use('/api/*', async (ctx, next) => {
    if (ctx.isUnauthenticated()) {
      logger.info('is not auth');
      ctx.redirect('/login');
      return;
    }

    return next();
  })

  .get('/', async (ctx) => {
    ctx.body = 'you must login';
  })

  .post('/login', async (ctx, next) =>
    passport.authenticate('local', { failureRedirect: '/' }, (err, user, info, status) => {
      if (!user) {
        logger.error(`${status} - ${info}`);
      } else {
        ctx.login(user);
        logger.info(`Login success for user: ${user.username}`);
        ctx.redirect('/api/test');
      }
    })(ctx, next)
  )

  .get('/api/test', async (ctx) => {
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
