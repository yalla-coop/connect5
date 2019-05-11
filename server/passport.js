const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Trainer = require("./database/models/Trainer");
// const keys = require('../config/keys');
require("env2")("./config/config.env");
// set up options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;
// opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    // use mongoose findById method and pass it the id stemming from the bearer toke auth object named jwt payload

    new JwtStrategy(opts, (jwt_payload, done) => {
      Trainer.findById(jwt_payload.id)
        .then((trainer) => {
          // use done function without error and either user or false

          if (trainer) {
            return done(null, trainer);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    }),
  );
};
