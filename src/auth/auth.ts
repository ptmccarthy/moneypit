import * as passport from 'koa-passport';
import { Strategy } from 'passport-local';

import logger from '../logger';
import { User } from '../entity/user';

passport.use('local', new Strategy({
  usernameField: 'username',
  passwordField: 'password',
}, async (username, password, done) => {
  const user = await User.getRepository().findOne({ username });

  if (user && user.password === password) {
    return done(null, user);
  } else {
    return done(null, false);
  }
}));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  const user = await User.getRepository().findOne({ id });
  done(null, user);
});
