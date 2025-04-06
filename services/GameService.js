const createError = require('http-errors');
const GameModel = require('../models/game');
const GameModelInstance = new GameModel();

module.exports = class GameService {
    async getGames(username) {
        try {
            const games = await GameModelInstance.getGamesForUsername(username);
            return games;
        } catch(err) {
            throw createError(500, err);
        }
    }

    async getGameDetails(username) {
        try {
            const gameDetails = await GameModelInstance.getGameDetailsForUsername(username);
            return gameDetails;
        } catch(err) {
            throw createError(500, err);
        }
    }
};