import 'reflect-metadata';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as passport from 'koa-passport';
import * as session from 'koa-session';
import { Strategy } from 'passport-local';

import db from './db/db';
import logger from './logger';
import routes from './routes/routes';

const PORT = 3000;

const koa = new Koa();
const router = new Router();

// koa-bodyparser
koa.use(bodyParser());

// koa-session
koa.keys = ['hurf durf'];
koa.use(session({}, koa));

// koa-passport
// auth.configureLocal();
koa.use(passport.initialize());
koa.use(passport.session());

passport.use('local', new Strategy({
  usernameField: 'username',
  passwordField: 'password',
}, async (username, password, done) => {
  logger.info(username);
  logger.info(password);
  return done(null, { username: 'foo' });
}));

passport.serializeUser((user: any, done) => {
  logger.info('serializing');
  done(null, user.username);
});

passport.deserializeUser((id, done) => {
  logger.info('deserializing');
  done(null, { username: 'foo' });
});

koa.use(routes.routes());
koa.listen(PORT);
logger.info(`Koa listening on port ${PORT}`);

db.connect()
  .then(() => logger.info('Postgres connected'))
  .catch((error) => logger.error('Failed to connect to postgres', error));
