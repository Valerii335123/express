const query = require('../dataBase/db-connection');

class User {
    static tableName = 'user';

    static async getByEmail(email) {
        const sql = `SELECT *
                     FROM ${this.tableName}
                     WHERE email = ?`;

        const result = await query(sql, [email]);

        return result[0];
    }

    static async create({name, email, password}) {
        const sql = `INSERT INTO ${this.tableName}
                         (name, email, password)
                     VALUES (?, ?, ?)`;

        const result = await query(sql, [name, email, password]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = User;