const bycrypt = require('bycrypt');

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(12);
        const password_digest = await bcrypt.hash(password, salt);
        return password_digest;
    }
    catch(err) {
        throw err;
    }
}
const comparePasswords = async (candidatePassword, passwordDigest) => {
    try {
        const match = await bcrypt.compare(candidatePassword, passwordDigest);
        return match;
    }
    catch(err) {
        throw err
    }
};

const loginRequired = (req, res, next) => {
    if(req.user) {
        return next();
    }
    else {
        req.status(401)
        .json({
            payload: null,
            msg: "You must signon to access Marathoner",
            err: true
        })
    }
}

module.exports = {
    hashPassword,
    comparePasswords,
    loginRequired
}