const db = require('../db.js');

const getUserByUsername = async (username) => {
    const USERBYID = `SELECT * FROM user WHERE username = $1;`
    try {
        const user = await db.oneOrNone(USERBYID, username);
        return user;
    }
    catch (err) {
        throw err;
    }
}
const addNewUser = async (user) => {
    const POSTUSER = `INSERT INTO users(username, avatar_url, password_digest) VALUES($1, $2, $3) RETURNING id, username`;
    try {
        const newUser = await db.one(POSTUSER, user);
        return newUser;
    }
    catch (err) {
        throw err;
    }
}
module.exports = {
    getUserByUsername,
    addNewUser
}