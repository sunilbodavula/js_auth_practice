const pool = require("../config/database");

const findByEmail = async (email) => {
    const result = await pool.query(
        `
            select id, name, email, password_hash, is_active 
            from users
            where email = $1;
        `,
        [email]
    );

    return result.rows[0];
}

const createUser = async (name, email, passwordHash) => {
    const result = await pool.query(
        `
            insert into users (name, email, password_hash)
            values ($1, $2, $3)
            returning id, name, email, is_active, created_at;
        `,
        [name, email, passwordHash]
    )

    return result.rows[0];
}

module.exports = {
    findByEmail,
    createUser
};