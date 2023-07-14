const permissionModel = require("../models/permissonModel");
const log4 = require("log4js");
const logger = log4.getLogger("index.js");
logger.level = "all"
//CREAR VALIDADORES

function createPermissons(req, res){
    //AGREGAR VALIDADOR DE ARRIBA
    const { code, namePermisson } = req.body;
    const addPermisson = new permissionModel({
        code: code,
        namePermisson: namePermisson
    });
    addPermisson.save((error) => {
        if(error){
            logger.error(error.message);
            res.status(504).send({msg: "Error en la creacion del permiso"})
        }else{
            res.status(200).send({msg: "Permiso creado correctamente"});
        }
    });
}
async function viewAllPermissons(req, res){
    //AGREGAR VALIDADOR
    const allPermissons = await permissionModel.find();
    if(!allPermissons){
        res.status(400).send({msg: "Error en la busqueda"});
    }else{
        res.status(200).send(allPermissons)
    }
}
// async function editPermisson(req, res){
//     const { id } = req.params;
//     const getPermisson = await permissionModel.findById({id:id});
//     var dataPermissons = [];
//     for(let i = 0; i < getPermisson.permissons.lenght; i++){
//         dataPermissons.push(getPermisson.permissons[i]);
//     }
//     permissionModel.findByIdAndUpdate(id, req.body, (error) => {
//         if(error){
//             res.status(400).send({msg : "Error al actualizar"});
//         }else{
//             res.status(200).send({msg : "Actualizando correctamente"});
//         }
//     });
// }
async function deletePermisson(req, res){
    //AGREGAR VALIDADOR
    const code = req.body;
    const deletePermisson = await permissionModel.deleteOne(code);
    if(!deletePermisson){
        res.status(400).send({msg: "Error en la eliminacion"});
    }else{
        res.status(400).send({msg : "Borrado correctamente"});
    }
}
module.exports = {
    createPermissons,
    viewAllPermissons,
    // editPermisson,
    deletePermisson
}