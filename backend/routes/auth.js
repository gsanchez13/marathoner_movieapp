const express = require('express');
const router = express.Router();
const authHelpers = require('../auth/helpers');
const userQueries = require('../database/queries/usersQueries');
const passport = require('../auth/passport.js');

router.post('/signup', async (req, res, next) => {
    const { username, avatar_url, password } = req.body;
    try {
        const passwordDigest = await authHelpers.hashPassword(password);
        const userInfo = {
            username: username,
            avatar_url: avatar_url,
            password: passwordDigest
        };
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
        return err;
    }
});

router.post('/login', passport.authenticate('local', {
    sucessRedirect: '/',
    successFlash: 'Welcome!',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.'
}));
//adds middleware form passport thats going to take in username & password and compare them and sucessfully logs them in

router.get('/logout', (req, res, next) => {
    req.logout();
    res.json({
        messge: "User sucessfully logged out",
        error: false
    })
  });

module.exports = router;