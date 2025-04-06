const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const GameService = require('../services/GameService');
const GameServiceInstance = new GameService();

module.exports = (app) => {
    app.use('/game', router);

    router.get('/', async (req, res, next) => {
        try {
            if (!req.body?.username) {
                throw createError(400, 'No username provided.');
            }
            const response = await GameServiceInstance.getGames(req.body.username);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.get('/detail', async (req, res, next) => {
        try {
            if (!req.body?.username) {
                throw createError(400, 'No username provided.');
            }
            const response = await GameServiceInstance.getGameDetails(req.body.username);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });
};