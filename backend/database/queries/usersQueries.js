const db = require('../db.js');

const getUserByUserId = async (userId) => {
    const USERBYID = `SELECT * FROM USERS WHERE id = $1`;
    try {
        const users = await db.any(USERBYID, userId)
    }
}
const POSTUSER = `INSERT INTO users(username, avatar_url) VALUES($1, $2)`;

module.exports = {
    USERINFO,
    USERBYID,
    POSTUSER
}