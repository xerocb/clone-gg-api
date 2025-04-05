const passport = require('passport');
const LocalStrategy = require('passport-local');

const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();
const PlayerModel = require('../models/player');
const PlayerModelInstance = new PlayerModel();

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await PlayerModelInstance.findOneById(id);
            done(null, user);
        } catch(err) {
            done(err);
        }
    });

    passport.use(new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await AuthServiceInstance.login({ username, password });
                return done(null, user);
            } catch(err) {
                return done(err);
            }
        }
    ));

    return passport;
};