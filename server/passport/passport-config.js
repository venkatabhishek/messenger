const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const uuid = require('uuid');
const mongoose = require('mongoose');

const Strategies = require('./strategies');
const { User } = require('../database/schemas');

module.exports = (app, io) => {
  const sessionConfig = {
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'sessions',
    }),
    genid: () => uuid.v4(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };

  const sessionMiddleware = session(sessionConfig);

  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
  });

  app.use(sessionMiddleware);
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) =>
    User.findById({ _id: id })
      .populate('friends')
      .then((user) => done(null, user))
      .catch((err) => console.warn(`err at deserialize: ${err}`)),
  );

  passport.use(Strategies.local);
};
