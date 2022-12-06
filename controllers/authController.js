const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const validator = require("../utils/validator");
const jwt = require("../utils/jws");
const log4 = require("log4js");
const logger = log4.getLogger("index.js");
logger.level = "all"

function register(req, res) {
    validator.validateUserRegister(req.body);
    const {firstname, lastname, email, username, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    const user = new User({
        firstname: firstname,
        lastname: lastname,
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        password: hashPass
    });
    user.save((error, userStorage) => {
        if(error){
            logger.error(error.message);
            res.status(504).send({ msg: "Error al crear el Usuario", code: 2001 });
        }else{
            res.status(202).send(userStorage);
        }
    });
}

function login(req, res){
    const { username, password } = req.body;
    if (!username) {
        logger.error("🚀 ~ file: usersController.js:36 ~ login ~ username", username);
        throw new Error("UserName is Required");
    }
    if(!password){
        logger.error("🚀 ~ file: usersController.js:40 ~ login ~ password", password);
        throw new Error("Password is Required");
    }
    validator.validateLogin(req.body);
    const userLowerCase = username.toLowerCase();
    User.findOne({ username: userLowerCase }, (error, userStore) => {
        if(error){
            logger.error(error.message);
            res.status(504).send({ msg: "Error en el inicio de Sesión" });
        }else{
            if(!userStore){
                logger.info("Usuario no existe");
                res.status(506).send({ msg: "Error en el inicio de Sesión" });
            }else{
                bcrypt.compare(password, userStore.password, (bcryptError, check) => {
                    if(bcryptError){
                        res.status(505).send({msg: "Error del Servidor"});
                    }else if(!check){
                        logger.error("Error de Contraseña");
                        res.status(506).send({msg: "Error del Servidor"});
                    }else if(!userStore.active){
                        logger.error("Usuario Inactivo");
                        res.status(503).send({msg: "Usuario no está autorizado"});
                    }else{
                        res.status(200).send({
                            msg: "Usuario Autorizado",
                            access: jwt.createAccessTokken(userStore),
                            refresh: jwt.createRefreshTokken(userStore)
                        });
                    }
                });
            }
        }
    });
}

function refreshAccessToken(req, res){
    const { token } = req.body;
    if(!token) res.status(504).send({msg: "Token es requerido"});
    const { user_id } = jwt.decoded(token);
    User.findById(user_id, (error, userStorage) => {
        if(error){
            logger.info("Usuario no existe");
            res.status(506).send({ msg: "Error en el inicio de Sesión" });
        }else{
            res.status(200).send({
                accessToken: jwt.createAccessTokken(userStorage),
            });
        }
    });
}

function usersView(req, res){
    res.status(200).send({msg: "Lista de Usuarios"});
}
module.exports = {
    register,
    usersView,
    refreshAccessToken,
    login,
}