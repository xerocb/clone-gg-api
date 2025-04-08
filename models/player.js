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

    async getUsernamesFromIds(ids) {
        try {
            let searchValues = '';
            for (let i = 0; i < ids.length; i++) {
                searchValues += `(${ids[i]}, ${i+1}), `;
            }
            searchValues = searchValues.slice(0, searchValues.length - 2);

            const statement = 
                `WITH ordering(id, ordering) AS (
                    VALUES ${searchValues}
                )
                SELECT p.username
                FROM players p
                INNER JOIN ordering o
                ON p.id = o.id
                ORDER BY o.ordering`;

            console.log(statement);
            
            const result = await db.query(statement, ids);

            if (result.rows?.length > 0) {
                return result.rows.map(row => row.username);
            }

            return null;
        } catch(err) {
            throw new Error(err);
        }
    }

    async getFavouriteChampData(id) {
        try {
            const statement = 
                `SELECT
                    c.name as name,
                    ROUND(AVG(gp.creep_score)) AS cs,
                    ROUND(AVG(gp.kills), 1) AS kills,
                    ROUND(AVG(gp.deaths), 1) AS deaths,
                    ROUND(AVG(gp.assists), 1) AS assists,
                    SUM(CASE WHEN g.winning_team = gp.team THEN 1 ELSE 0 END) as wins,
                    COUNT(*) as games
                FROM champions c
                INNER JOIN game_players gp
                ON c.id = gp.champion_id
                INNER JOIN games g
                ON gp.game_id = g.id
                WHERE gp.player_id = $1
                GROUP BY gp.champion_id, c.name
                ORDER BY games DESC
                LIMIT 7`;
            const values = [id];

            const result = await db.query(statement, values);

            if (result.rows?.length > 0) {
                return result.rows;
            }

            return null;
        } catch(err) {
            throw new Error(err);
        }
    }

    async getStatsData(id) {
        try {
            const statement = 
                `WITH stats AS (
                    SELECT
                        SUM(CASE WHEN g.winning_team = gp.team THEN 1 ELSE 0 END) as wins,
                        SUM(CASE WHEN g.winning_team = gp.team THEN 0 ELSE 1 END) as losses
                    FROM games g
                    INNER JOIN game_players gp
                    ON g.id = gp.game_id
                    WHERE gp.player_id = $1
                )
                SELECT
                    wins,
                    losses,
                    ROUND(wins*100.0/NULLIF(wins+losses, 0)) as winrate
                FROM stats`;
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

    async getRecentlyPlayedData(id) {
        try {
            const statement = 
                `SELECT
                    p.username,
                    SUM(CASE WHEN g.winning_team = gp2.team THEN 1 ELSE 0 END) as wins,
                    SUM(CASE WHEN g.winning_team = gp2.team THEN 0 ELSE 1 END) as losses
                FROM game_players gp1
                INNER JOIN game_players gp2
                    ON gp1.game_id = gp2.game_id
                    AND gp1.team = gp2.team
                    AND gp1.player_id <> gp2.player_id
                INNER JOIN games g
                    ON g.id = gp2.game_id
                INNER JOIN players p
                    ON gp2.player_id = p.id
                WHERE gp1.player_id = $1
                GROUP BY gp2.player_id, p.username
                HAVING COUNT(*) >= 2
                ORDER BY COUNT(*) DESC
                LIMIT 7`;
            const values = [id];

            const result = await db.query(statement, values);

            if (result.rows?.length > 0) {
                return result.rows;
            }

            return null;
        } catch(err) {
            throw new Error(err);
        }
    }
};