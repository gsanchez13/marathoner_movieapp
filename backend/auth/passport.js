const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparePasswords } = require('./helpers');
const usersQueries = require('../database/queries/usersQueries');

passport.use(new LocalStrategy(async (username, password, done) => {
    console.log("authenticating user")
    try {
        const user = await usersQueries.getUserByUsername(username)
        if (!user) {
            return done(null, false)
            //if username is not found in database, this is not an error so returns null as error and false for use since it was not found.
        }
        const passMatch = await comparePasswords(password, user.password_digest);
        if (!passMatch) {
            return done(null, false)
            //if password doesn't match, there is a null error and false user
        }
        delete user.password_digest;
        done(null, user)
        //done line is adding user to session storage and returns the null error and the user that is sucessfully logged in. 
    }
    catch (err) {
        done(err);
    }
}));

passport.serializeUser((user, done) => {
    //serializes user to session
    console.log("serializing user into session")
    done(null, user)
});

passport.deserializeUser(async (user, done) => {
    //deserializes user to session
    try {
        let retrievedUser = await usersQueries.getUserByUsername(user.username);
        delete retrievedUser.password_digest;
        done(null, retrievedUser);
    }
    catch(err) {
        done(null, false)
    }
});

module.exports = passport;