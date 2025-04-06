const authRouter = require('./auth');
const playerRouter = require('./player');

module.exports = (app, passport) => {
    authRouter(app, passport);
    playerRouter(app);
};