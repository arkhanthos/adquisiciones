const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const validator = require("../utils/validator");
const jwt = require("../utils/jws");
const log4 = require("log4js");
const e = require("cors");
const { find, validate } = require("../models/userModel");
const logger = log4.getLogger("index.js");
logger.level = "all"

//Recibe los datos desde el body
//Crea el usuario con los datos recibidos
//Lanza error 
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
            res.status(500).send({ msg: "Error al crear el Usuario", code: 2001 });
        }else{
            res.status(202).send(userStorage);
        }
    });
}
//Recibe usuario y contraseña del front
//Verifica existencia de datos
//Lanza error si el usuario no existe y si existe crea un token de acceso
function login(req, res){
    //const { username, password } = req.body;
    const username = req.body.username;
    const password = req.body.password;
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
                            refresh: jwt.createRefreshTokken(userStore),
                            role: userStore.role,
                            id: userStore._id
                        });
                    }
                });
            }
        }
    });
}

//Recibe el token de acceso del login
//Verifica la existencia del token y del usuario
//Regresa error si las condiciones no se cumplen y si existen regresa el token refrescado 
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

//No recibe datos del front
//Busca todos los usuarios en la base de datos
//Muestra todos los usuarios o lanza error en la busqueda
async function usersView(req, res){
    const allusers = await User.find();  
    console.log(allusers[0]);
    if (!allusers){
        res.status(400).send({ msg:"Error en la busqueda"});
    }else{
        res.status(200).send(allusers);
    }
}

//Recibe el nombre de usuario desde el front
//Busca el dato exactamente coincidente del front en la base de datos y lo guarda
//Lanza error si no existe ese usuario o lo muestra en caso de existir
async function findUser(req, res){
    const { username } = req.body;
        const findUs = await User.findOne({ username },'username firstname lastname email -_id role');
    if (!findUs){
        res.status(400).send({ msg:"Error en la bsuqueda"});
    }else{
        res.status(200).send(findUs);
    }
}

//Recibe el nombre de usuario desde el front
//Obtiene el estado de usuario y lo cambia por el contrario (active - disabled)
//Si hace cambios muestra lo cambiado, de caso contrario lanza error
async function changeStatusUser(req, res){
    const { username } = req.body;
    const change = await User.find({username:username},{active:1});
    for(let i = 0; i < change.length; i++){
        if(change[i].active === false){
            const stat = !change[i].active;
            const changed = await User.findOneAndUpdate({username:username},{$set: {active:stat}});
            res.status(200).send(changed);
        }else if(change[i].active === true){
            const stat = !change[i].active;
            const changed = await User.findOneAndUpdate({username:username},{$set: {active:stat}});
            res.status(200).send(changed);
        }else{
            res.status(400).send({msg:"Error en la actualizacion del estado"});
        }
    }
}

async function changeLoggedUserData(req, res){
    const { id } = req.params;
    const editUser = await User.findByIdAndUpdate(id,req.body);
    if(!editUser){
        res.status(400).send({msg: "Error en la actualizacion de usuario"});
    }else{
        res.status(200).send(editUser);
    }
}

module.exports = {
    register, 
    usersView,
    refreshAccessToken,
    login,
    findUser,
    changeStatusUser,
    changeLoggedUserData
}