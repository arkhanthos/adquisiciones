const jwt = require("../utils/jws");
const log4 = require("log4js");
const logger = log4.getLogger("perissonMiddleware")
logger.level= "all";
const User = require("../models/userModel");

const JWT_KEY = process.env.KEY_PRI;

async function adminPermission(req, res, next){
    const token = req.headers.authorization.replace("Bearer ","");
    const payload = jwt.decoded(token);
    const id = payload.user_id;
    const permisson = await User.find({_id:id},{role:1, _id:0}); //role cambiar por la variable de permiso del modelo de usuario
    for(let i = 0 ; i < permisson.length ; i++){
        if(permisson[i].permisson == "admin"){
            console.log("You have admin permisson");
            next();
            return res;
        }
    }
    return res.status(403).send({msg: "Require admin role"});
}

async function readSelfPermission(req, res, next){
    const token = req.headers.authorization.replace("Bearer ","");
    const payload = jwt.decoded(token);
    const id = payload.user_id;
    const permisson = await User.find({_id:id},{role:1, _id:0}); //role cambiar por la variable de permiso del modelo de usuario
    for(let i = 0 ; i < permisson.length ; i++){
        if(permisson[i].permisson == "readSelf"){
            console.log("You have read your request permisson");
            next();
            return res;
        }
    }
    return res.status(403).send({msg: "Require read permisson"});
}

async function readAllExportPermission(req, res, next){
    const token = req.headers.authorization.replace("Bearer ","");
    const payload = jwt.decoded(token);
    const id = payload.user_id;
    const permisson = await User.find({_id:id},{role:1, _id:0}); //role cambiar por la variable de permiso del modelo de usuario
    for(let i = 0 ; i < permisson.length ; i++){
        if(permisson[i].permisson == "readSelf"){
            console.log("You have read your request permisson");
            next();
            return res;
        }
    }
    return res.status(403).send({msg: "Require read permisson"});
}

async function readSelsWritePermission(req, res, next){
    const token = req.headers.authorization.replace("Bearer ","");
    const payload = jwt.decoded(token);
    const id = payload.user_id;
    const permisson = await User.find({_id:id},{role:1, _id:0}); //role cambiar por la variable de permiso del modelo de usuario
    for(let i = 0 ; i < permisson.length ; i++){
        if(permisson[i].permisson == "readSelfWrite"){
            console.log("You have read your request permisson");
            next();
            return res;
        }
    }
    return res.status(403).send({msg: "Require read permisson"});
}

async function managerPermission(req, res, next){
    const token = req.headers.authorization.replace("Bearer ","");
    const payload = jwt.decoded(token);
    const id = payload.user_id;
    const permisson = await User.find({_id:id},{role:1, _id:0}); //role cambiar por la variable de permiso del modelo de usuario
    for(let i = 0 ; i < permisson.length ; i++){
        if(permisson[i].permisson == "manager"){
            console.log("You have manager permisson");
            next();
            return res;
        }
    }
    return res.status(403).send({msg: "Require manager permisson"});
}

module.exports = {
    adminPermission,
    readSelfPermission,
    readAllExportPermission,
    readSelsWritePermission,
    managerPermission
}