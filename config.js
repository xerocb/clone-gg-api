const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    DB: {
        USER: process.env.DBUSER,
        HOST: process.env.DBHOST,
        DATABASE: process.env.DBDATABASE,
        PASSWORD: process.env.DBPASSWORD,
        PORT: process.env.DBPORT
    },
    SESSION_SECRET: process.env.SESSION_SECRET
};