const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

module.exports = (app, passport) => {
    app.use('/auth', router);

    router.post('/signup', async (req, res, next) => {
        try {
            const response = await AuthServiceInstance.signup(req.body);
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });

    router.post('/login', 
        passport.authenticate('local'),
        async (req, res, next) => {
            try {
                const response = await AuthServiceInstance.login(req.body);
                res.status(200).send(response);
            } catch(err) {
                next(err);
            }
        }
    );

    router.post('/logout', (req, res, next) => {
        try {
            if (!req.user) {
                throw createError(401, 'No user logged in.');
            }
            req.logout(err => { if (err) next(err); });
            res.status(200).send();
        } catch(err) {
            next(err);
        }
    });
};