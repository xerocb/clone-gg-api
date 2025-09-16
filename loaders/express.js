const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const mySqlSession = require('express-mysql-session')(session);
const pool = require('../db').pool;
const FRONT_END_ORIGIN = require('../config').FRONT_END_ORIGIN;
const SESSION_SECRET = require('../config').SESSION_SECRET;

module.exports = (app) => {
    app.set('trust proxy', 1);
    app.use(cors({
        origin: FRONT_END_ORIGIN,
        credentials: true
    }));
    app.use(bodyParser.json());

    app.use(
        session({
            store: new mySqlSession({}, pool),
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
