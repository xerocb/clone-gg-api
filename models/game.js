const db = require('../db');

module.exports = class GameModel {
    async getGamesForUsername(username) {
        try {
            const statement = 
                `SELECT g.*
                FROM games g
                INNER JOIN game_players gp
                ON g.id = gp.game_id
                INNER JOIN players p
                ON gp.player_id = p.id
                WHERE p.username = $1
                ORDER BY g.game_end DESC
                LIMIT 20`;
            const values = [username];

            const result = await db.query(statement, values);
            
            if (result.rows?.length > 0) {
                return result.rows;
            }

            return null;
        } catch(err) {
            throw new Error(err);
        }
    }

    async getGameDetailsForUsername(username) {
        try {
            const statement = 
                `SELECT gp.*
                FROM game_players gp
                INNER JOIN games g
                ON gp.game_id = g.id
                WHERE gp.game_id IN (
                    SELECT game_id
                    FROM game_players
                    WHERE player_id = (
                        SELECT id
                        FROM players
                        WHERE username = $1
                    )
                )
                ORDER BY g.game_end, gp.id
                LIMIT 200`;
            const values = [username];

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