const express = require('express');
const router = express.Router();
const authHelpers = require('../auth/helpers');
const userQueries = require('../database/queries/usersQueries');
const passport = require('../auth/passport.js');

router.post('/signup', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const passwordDigest = await authHelpers.hashPassword(password);
        const userInfo = {
            username: username,
            password: passwordDigest
        }
        let newUser = await userQueries.addNewUser(userInfo);
        res.status(200)
            .json({
                payload: newUser,
                message: 'Successfully added new user to database.',
                error: false
            })
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});

module.exports = router