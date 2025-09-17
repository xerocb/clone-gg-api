const mysql = require('mysql2/promise');
const DB = require('../config').DB;

const pool = mysql.createPool({
    user: DB.USER,
    host: DB.HOST,
    database: DB.DATABASE,
    password: DB.PASSWORD,
    port: DB.PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};
