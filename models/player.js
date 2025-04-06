const db = require('../db');

module.exports = class PlayerModel {
    async create({ username, password }) {
        try {
            const statement = 
                `INSERT INTO players
                (username, password)
                VALUES
                ($1, $2)`;
            const values = [username, password];

            await db.query(statement, values);
        } catch(err) {
            throw new Error(err);
        }
    }

    async update({ id, data }) {
        try {
            const columns = Object.keys(data);
            const dataValues = Object.values(data);
            let updateFields = '';
            for (let i = 0; i < columns.length; i++) {
                const quote = typeof dataValues[i] === "string" ? "'" : "";
                updateFields += `${columns[i]} = ${quote}${dataValues[i]}${quote}, `
            }
            updateFields = updateFields.slice(0, updateFields.length - 2);

            const statement = 
                `UPDATE players
                SET ${updateFields}
                WHERE id=$1`;
            const queryValues = [id];

            await db.query(statement, queryValues);
        } catch(err) {
            throw new Error(err);
        }
    }

    async findOneById(id) {
        try {
            const statement = 
                `SELECT *
                FROM players
                WHERE id=$1`;
            const values = [id];

            const result = await db.query(statement, values);

            if (result.rows?.length > 0) {
                return result.rows[0];
            }

            return null;
        } catch(err) {
            throw new Error(err);
        }
    }

    async findOneByUsername(username) {
        try {
            const statement = 
                `SELECT *
                FROM players
                WHERE username=$1`;
            const values = [username];

            const result = await db.query(statement, values);

            if (result.rows?.length > 0) {
                return result.rows[0];
            }

            return null;
        } catch(err) {
            throw new Error(err);
        }
    }
}