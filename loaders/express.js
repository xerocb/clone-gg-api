const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('../db').pool;
const FRONT_END_ORIGIN = require('../config').FRONT_END_ORIGIN;
const SESSION_SECRET = require('../config').SESSION_SECRET;

module.exports = (app) => {
    app.use(cors({
        origin: FRONT_END_ORIGIN,
        credentials: true
    }));
    app.use(bodyParser.json());

    app.use(
        session({
            store: new pgSession({
                pool
            }),
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: 'none'
            }
        })
    );

    return app;
};