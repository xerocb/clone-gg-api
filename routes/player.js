const express = require('express');
const router = express.Router();

const PlayerService = require('../services/PlayerService');
const PlayerServiceInstance = new PlayerService();

module.exports = (app) => {
    app.use('/player', router);

    router.get('/username/:username', async (req, res, next) => {
        try {
            const { username } = req.params;
            const response = await PlayerServiceInstance.getPlayer(username);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.get('/usernames/:ids', async (req, res, next) => {
        try {
            const ids = req.params.ids.split(',');
            const response = await PlayerServiceInstance.getUsernames(ids);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.get('/:id/favChamps', async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await PlayerServiceInstance.getFavouriteChamps(id);
            if (!response) {
                res.status(204).send();
            } else {
                res.status(200).send(response);
            }
        } catch(err) {
            next(err);
        }
    });

    router.get('/:id/stats', async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await PlayerServiceInstance.getStats(id);
            if (response.wins === null) {
                res.status(204).send();
            } else {
                res.status(200).send(response);
            }
        } catch(err) {
            next(err);
        }
    });

    router.get('/:id/recentlyPlayed', async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await PlayerServiceInstance.getRecentlyPlayed(id);
            if (!response) {
                res.status(204).send();
            } else {
                res.status(200).send(response);
            }
        } catch(err) {
            next(err);
        }
    });
};