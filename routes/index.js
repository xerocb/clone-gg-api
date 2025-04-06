const authRouter = require('./auth');
const playerRouter = require('./player');
const gameRouter = require('./game');

module.exports = (app, passport) => {
    authRouter(app, passport);
    playerRouter(app);
    gameRouter(app);
};