const jwt = require("jsonwebtoken");
const log4 = require("log4js");
const logger = log4.getLogger(" ");
logger.level = "all";

const JWT_KEY = process.env.KEY_PRI;


function createAccessTokken(user){
    const expiredTokken = new Date();
    expiredTokken.setHours(expiredTokken.getHours() + 3);

    const payload = {
        token_type: "access",
        user_id: user._id,
        iat: Date.now(), // DATE CREATE TOKKEN
        expired: expiredTokken.getTime(),
    }

    return jwt.sign(payload, JWT_KEY);
}

function createRefreshTokken(user){
    const expiredTokken = new Date();
    expiredTokken.getMonth(expiredTokken.getMonth() + 1);

    const payload = {
        token_type: "refresh",
        user_id: user._id,
        iat: Date.now(), // DATE CREATE TOKKEN
        expired: expiredTokken.getTime(),
    }

    return jwt.sign(payload, JWT_KEY);
}

function decoded(token){
    return jwt.decode(token, JWT_KEY, true);
}

module.exports = {
    createAccessTokken,
    createRefreshTokken,
    decoded
}