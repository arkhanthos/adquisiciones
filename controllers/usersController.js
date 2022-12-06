const UserModel = require("../models/userModel");
const validator = require("../utils/validator");
const imageValidate = require("../utils/image");
const bcrypt = require("bcryptjs");
const log4 = require("log4js");
const logger = log4.getLogger("authMiddleware");
logger.level = "all";


async function getOne(req, res){
    const { user_id } = req.user;
    const response = await UserModel.findById(user_id);
    if (!response) {
        res.status(400).send({msg: "No se ha encontrado el usuario"});
    }else{
        res.status(200).send(response);
    }
}
async function getAll(req, res){
    const { active } = req.body;
    let response = null;
    if(active === undefined){
        response = await UserModel.find();
    }else{
        response = await UserModel.find({ active});
    }
    res.status(200).send(response);
}

async function createUser(req, res){
    validator.validateUserCreate(req.body);
    const {firstname, lastname, email, username, role, active, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    let imagePath = "";
    const user = new UserModel({
        firstname: firstname,
        lastname: lastname,
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        role: role,
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
module.exports = {
    getOne,
    getAll,
    createUser,
}