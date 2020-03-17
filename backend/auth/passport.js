const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparePassword } = require('./helpers');
const usersQueries = require('../database/queries/usersQueries');

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await usersQueries.getUserByUsername(username)
        if (!user) {
            return done(null, false)
        }
        const passMatch = await comparePasswords(password, user.password_digest);
        if (!passMatch) {
            return done(null, false)
        }
        delete user.password_digest;
        done(null, user)
    }
    catch (err) {
        done(err);
    }
}));

module.exports = passport;