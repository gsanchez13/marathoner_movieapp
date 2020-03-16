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
    const { username, password } = user;
    const POSTUSER = `INSERT INTO users(username, password_digest) VALUES($1, $2) RETURNING id, username, password_digest`;
    try {
        const newUser = await db.one(POSTUSER, [ username, password ]);
        return newUser;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}
module.exports = {
    getUserByUsername,
    addNewUser
}