const expressLoader = require('./express');
const passportLoader = require('./passport');
const routeLoader = require('../routes');

module.exports = async (app) => {
    const expressApp = await expressLoader(app);
    const passport = await passportLoader(expressApp);
    await routeLoader(app, passport);

    app.use((err, req, res, next) => {
        res.status(err.status ?? 500).send(err.message);
    });
};