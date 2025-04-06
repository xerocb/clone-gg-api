const express = require('express');
const router = express.Router();

const PlayerService = require('../services/PlayerService');
const PlayerServiceInstance = new PlayerService();

module.exports = (app) => {
    app.use('/player', router);

    router.get('/', async (req, res, next) => {
        try {
            if (!req.body?.username) {
                throw createError(400, 'No username provided.');
            }
            const response = await PlayerServiceInstance.getPlayer(req.body.username);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.get('/usernames', async (req, res, next) => {
        try {
            const response = await PlayerServiceInstance.getUsernames(req.body.ids);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.get('/:id/favChamps', async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await PlayerServiceInstance.getFavouriteChamps(id);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.get('/:id/stats', async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await PlayerServiceInstance.getStats(id);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.get('/:id/recentlyPlayed', async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await PlayerServiceInstance.getRecentlyPlayed(id);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });
};