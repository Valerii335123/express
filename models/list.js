const query = require('../dataBase/db-connection');

class List {
    static tableName = 'list';
    static PRIORITY_ARRAY = [1, 2, 3, 4, 5];

    static STATUS_ACTIVE = "to_do";
    static STATUS_DEACTIVE = "done";

    static async find({title, description, create_from, create_to, priority}, userId) {

        create_from = create_from ? new Date(create_from * 1000).toISOString().slice(0, 19).replace('T', ' ') : '';
        create_to = create_to ? new Date(create_to * 1000).toISOString().slice(0, 19).replace('T', ' ') : '';

        var sql = `SELECT *
                   FROM ${this.tableName}
                   WHERE title like "%${title ?? ''}%"
                     and description like "%${description ?? ''}%"
        `;
        if (priority) sql += `and priority = "${priority ?? ''}"`;
        if (create_from) sql += `and created_at >= "${create_from ?? ''}"`;
        if (create_to) sql += `and created_at <= "${create_to ?? ''}"`;

        const result = await query(sql, []);

        return result;
    }

    static async getById(id) {
        const sql = `SELECT *
                     FROM ${this.tableName}
                     WHERE id = ?`;

        const result = await query(sql, [id]);

        return result[0];
    }

    static async create({title, description, priority, parent_id}, userId) {
        const sql = `INSERT INTO ${this.tableName}
                         (title, description, priority, user_id, parent_id)
                     VALUES (?, ?, ?, ?, ?)`;

        const result = await query(sql, [title, description, priority, userId, parent_id ?? null]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }

    static async update(params, id) {
        const sql = `UPDATE ${this.tableName}
                     SET title       = ?,
                         description = ?
                     WHERE id = ?`;
        const result = await query(sql, [...Object.values(params), id]);

        return result;
    }

    static async delete(id) {

        const sql = `DELETE
                     FROM ${this.tableName}
                     WHERE id = ?`;

        const result = await query(sql, [id]);

        return result;
    }

    static async closed(id) {
        const sql = `UPDATE ${this.tableName}
                     SET closed_at = CURRENT_TIMESTAMP,
                         status    = "${this.STATUS_DEACTIVE}"

                     WHERE id = ?`;
        const result = await query(sql, [id]);

        return result;
    }


    static async isHaveChildActive(parentID) {
        const sql = `WITH RECURSIVE w1(id, parent_id, title, level) AS
                                        (SELECT id,
                                                parent_id,
                                                title,
                                                0 AS level
                                         FROM ${this.tableName}
                                         WHERE parent_id = ?
                                           and status = "${this.STATUS_ACTIVE}"
                                           and closed_at is null

                                         UNION ALL
                                         SELECT ${this.tableName}.id,
                                                ${this.tableName}.parent_id,
                                                ${this.tableName}.title,
                                                level + 1
                                         FROM ${this.tableName}
                                                  JOIN w1 ON ${this.tableName}.parent_id = w1.id
                                         WHERE status = "${this.STATUS_ACTIVE}"
                                           AND closed_at is null)

                     SELECT EXISTS(SELECT*
                                   FROM w1) as "exist"`;

        const result = await query(sql, [parentID]);

        return result[0];
    }

}

module.exports = List;