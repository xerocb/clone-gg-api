const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const PlayerService = require('../services/PlayerService');
const PlayerServiceInstance = new PlayerService();

module.exports = (app) => {
    app.use('/player', router);

    router.get('/usernames', async (req, res, next) => {
        try {
            const response = await PlayerServiceInstance.getUsernames(req.body.ids);
            if (!response) {
                res.status(404).send();
            }
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });
};