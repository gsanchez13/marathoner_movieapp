const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparePassword } = require('./helpers');
const usersQueries = require('../database/queries/usersQueries');

// passport.use(new LocalStrategy(async (username, password, done) => {
//     try {
//         const user = await usersQueries.
//     }
//     catch(err) {
//         throw err;
//     }
// })
module.exports = passport;