const jwt = require("../utils/jws");
const log4 = require("log4js");
const logger = log4.getLogger("authMiddleware");
logger.level = "all";

function asureAuth(req, res, next){
    if(!req.headers.authorization){
        logger.trace("Network Authentication Required");
        return res.status(511).send({msg: "Token no existe"});
    }
    const token = req.headers.authorization.replace("Bearer ", "");
    try {
        const payload = jwt.decoded(token);
        const { expired } = payload;
        const currentData = new Date().getTime();
        if(expired <= currentData){
            return res.status(511).send({msg: "El token ka expidado"});
        }
        req.user = payload;
        next();
    } catch (error) {
        logger.trace("Network Authentication Required, Message: ",error.message);
        return res.status(510).send({msg: "Token inválido"});
    }
}

module.exports = {
    asureAuth,
}