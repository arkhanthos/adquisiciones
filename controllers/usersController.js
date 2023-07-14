const UserModel = require("../models/userModel");
const validator = require("../utils/validator");
const permisson = require("../models/permissonModel");
const imageValidate = require("../utils/image");
const bcrypt = require("bcryptjs");
const log4 = require("log4js");
const logger = log4.getLogger("authMiddleware");
logger.level = "all";

//Recibe el id de la base de datos desde la url
//Busca en usuario asociado a ese id
//Lanza error si ocurre algun problema, de lo contrario muestra los datos del usuario
async function getOne(req, res){
    const { user_id } = req.user;
    const response = await UserModel.findById(user_id);
    if (!response) {
        res.status(400).send({msg: "No se ha encontrado el usuario"});
    }else{
        res.status(200).send(response);
    }
}

//No recibe datos del front
//
async function getAll(req, res){
    const { active } = req.body;
    let response = null;
    if(active === undefined){
        response = await UserModel.find();
    }else{
        response = await UserModel.find({active});
    }
    logger.trace(req.user);
    res.status(200).send(response);
}
//
async function createUser(req, res){
    validator.validateUserCreate(req.body);
    const {firstname, lastname, email, username, role, code, active, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    let imagePath = "";
    const accessPermisson = permisson.findOne({code:code},'-_id -__v');
    // const getPermisson = permisson.findOne
    //const getPermisson = variable del req.body[0].id
    //const selectPermisson = permisson.findOne({id:getPermisson},''); //AGREGAR A LAS VARIABLES DE ABAJO
    //LA SECCION DE ARRIBA DEBE TENERLA EL ADMINISTRADOR
    //YA QUE ESTA ACCION NO PUEDE TENERLA EL USUARIO Y POR DEFECTO SE LE DEBEN DAR PERMISOS DE USUARIO 
    const user = new UserModel({
        firstname: firstname,
        lastname: lastname,
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        role: role,
        permisson:{
            code: code,
            namePermisson : accessPermisson.namePermisson
        },
        active: active,
        password: hashPass
    });
    if(req.files.avatar){
        imagePath = imageValidate.getFilePath(req.files.avatar);
    }else{
        imagePath = "avatar/user.png";
    }
    user.avatar = imagePath;
    user.save((error, userStorage) => {
        if(error){
            logger.error(error.message);
            res.status(504).send({ msg: "Error al crear el Usuario", code: 2001 });
        }else{
            res.status(202).send(userStorage);
        }
    }); 
}
//
function editUserData(req, res){
    const { username, password } = req.body;
    validator.validateEqualPass(req.body);
    const editData = UserModel.updateOne({ username : username },{$set: {password : password}});
    if(!editData){
        res.status(504).send({msg:"Error al cambiar la contraseña"});
    }else{
        res.status(202).send(editData);
    }
}

module.exports = {
    getOne,
    getAll,
    createUser,
    editUserData
}