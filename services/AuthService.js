const createError = require('http-errors');
const bcrypt = require('bcrypt');
const PlayerModel = require('../models/player');
const PlayerModelInstance = new PlayerModel();

const SALT_ROUNDS = Number(require('../config').SALT_ROUNDS);

const passwordHash = async(password, saltRounds) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch(err) {
        console.log(err);
        return null;
    }
}

const comparePasswords = async (password, hash) => {
    try {
        const matchFound = await bcrypt.compare(password, hash);
        return matchFound;
    } catch(err) {
        console.log(err);
        return false;
    }
}

module.exports = class AuthService {
    async login({ username, password }) {
        try {
            const user = await PlayerModelInstance.findOneByUsername(username);

            if (!user) {
                throw createError(401, 'Incorrect username.');
            }

            const passwordMatch = await comparePasswords(password, user.password);

            if (!passwordMatch) {
                throw createError(401, 'Incorrect password.');
            }

            return user;
        } catch(err) {
            throw createError(500, err);
        }
    }

    async signup({ username, password }) {
        try {
            if (!username || !password) {
                throw createError(400, 'Username and password must be provided.')
            }

            const user = await PlayerModelInstance.findOneByUsername(username);

            if (user) {
                throw createError(409, 'Username already in use.');
            }

            const hashedPassword = await passwordHash(password, SALT_ROUNDS);

            await PlayerModelInstance.create({ username, password: hashedPassword });
        } catch(err) {
            throw createError(500, err);
        }
    }

    async updatePassword({ userId, newPassword }) {
        try {
            if (!userId || !newPassword) {
                throw createError(400, 'User ID and new password must be provided.');
            }

            const hashedPassword = await passwordHash(newPassword, SALT_ROUNDS);

            await PlayerModelInstance.update({ id: userId, data: { password: hashedPassword } });
        } catch(err) {
            throw createError(500, err);
        }
    }
};