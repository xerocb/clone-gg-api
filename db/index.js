const Pool = require('pg').Pool;
const DB = require('../config').DB;

const pool = new Pool({
    user: DB.USER,
    host: DB.HOST,
    database: DB.DATABASE,
    password: DB.PASSWORD,
    port: DB.PORT
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};