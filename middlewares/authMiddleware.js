const jwt = require("../utils/jws");
const log4 = require("log4js");
const logger = log4.getLogger("authMiddleware");
logger.level = "all";
const User = require("../models/userModel");

const JWT_KEY = process.env.KEY_PRI;

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
            return res.status(511).send({msg: "El token a expidado"});
        }
        req.user = payload;
        console.log(payload);
        next();
        
    } catch (error) {
        logger.trace("Network Authentication Required, Message: ",error.message);
        return res.status(510).send({msg: "Token inválido"});
    }
};
async function adminPermission(req, res, next){
    const token = req.headers.authorization.replace("Bearer ", "");
    const payload = jwt.decoded(token);
    const id = payload.user_id;
    const roles = await User.find({_id:id},{role:1,_id:0});
    for(let i = 0; i < roles.length; i++){
        if(roles[i].role === "admin"){
            next();
            return res;
            console.log("Access granted");
        }
    }
    return res.status(403).send({msg: "Require admin role"});
};
async function userPermission(req, res, next){
    const token = req.headers.authorization.replace("Bearer ", "");
    const payload = jwt.decoded(token);
    const id = payload.user_id;
    const roles = await User.find({_id:id},{role:1,_id:0});
    for(let i = 0; i < roles.length; i++){
        if(roles[i].role === "user"){
            next();
            return res;
            console.log("Access granted");
        }
    }
    return res.status(403).send({msg: "Require user role"});
};
module.exports = {
    asureAuth,
    adminPermission,
    userPermission
};