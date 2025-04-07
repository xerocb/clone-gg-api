const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const GameService = require('../services/GameService');
const GameServiceInstance = new GameService();

module.exports = (app) => {
    app.use('/game', router);

    router.get('/:username', async (req, res, next) => {
        try {
            const { username } = req.params;
            const response = await GameServiceInstance.getGames(username);
            if (!response) {
                res.status(204).send();
            } else {
                res.status(200).send(response);
            }
        } catch(err) {
            next(err);
        }
    });

    router.get('/:username/detail', async (req, res, next) => {
        try {
            const { username } = req.params;
            const response = await GameServiceInstance.getGameDetails(username);
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