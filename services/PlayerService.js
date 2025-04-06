const createError = require('http-errors');
const PlayerModel = require('../models/player');
const PlayerModelInstance = new PlayerModel();

module.exports = class PlayerService {
    async getUsernames(ids) {
        try {
            const usernames = await PlayerModelInstance.getUsernamesFromIds(ids);
            return usernames;
        } catch(err) {
            throw createError(500, err);
        }
    }
};