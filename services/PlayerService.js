const createError = require('http-errors');
const PlayerModel = require('../models/player');
const PlayerModelInstance = new PlayerModel();

module.exports = class PlayerService {
    async getUsernames(ids) {
        try {
            const usernames = await PlayerModelInstance.getUsernamesFromIds(ids);

            if (!usernames) {
                throw createError(404);
            }

            return usernames;
        } catch(err) {
            throw createError(500, err);
        }
    }

    async getFavouriteChamps(id) {
        try {
            const champs = await PlayerModelInstance.getFavouriteChampData(id);
            return champs;
        } catch(err) {
            throw createError(500, err);
        }
    }

    async getStats(id) {
        try {
            const stats = await PlayerModelInstance.getStatsData(id);
            return stats;
        } catch(err) {
            throw createError(500, err);
        }
    }

    async getRecentlyPlayed(id) {
        try {
            const recentlyPlayed = await PlayerModelInstance.getRecentlyPlayedData(id);
            return recentlyPlayed;
        } catch(err) {
            throw createError(500, err);
        }
    }
};