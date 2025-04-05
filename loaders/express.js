const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const SESSION_SECRET = require('../config').SESSION_SECRET;

module.exports = (app) => {
    app.use(cors());
    app.use(bodyParser.json());

    app.use(
        session({
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                maxAge: 24 * 60 * 60 * 1000
            }
        })
    );

    return app;
};