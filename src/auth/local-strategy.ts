import * as passportLocal from 'passport-local';

const options = {};

export const localStrategy = new passportLocal.Strategy(options, (username, password, done) => {

  return done(null, { name: 'foo' });

});
