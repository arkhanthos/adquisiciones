const traceModel = require("../models/traceModel");
const addressModel = require("../models/addressModel");
const log4 = require("log4js");
const logger = log4.getLogger("index.js");
logger.level = "all";
//Añadir los validadores

async function assignment(req, res){
    const { serie, equipmentName, userName, address } = req.body;
    const getAddress = address[0].id;
    const findAddress = await addressModel.findOne({id:getAddress},'id store storeAddress -_id');
    const agreementStatus = "Asignado";
    const assign = new traceModel({
        serie:serie,
        equipmentName:equipmentName,
        userName:userName,
        address:findAddress,
        agreementStatus:agreementStatus
    });
    assign.save((error) =>{
        if(error){
            logger.error(error.message);
            res.status(504).send({msg:"Error al asignar el equipo"});
        }else{
            res.status(200).send(assign);
        }
    });
}

function searchAssignment(req, res){
    const { body } = req.body;
    const query = {
        $or:[
            { serie: { $regex : body, $options : "i"}},
            { equipmentName : { $regex: body, $options : "i"}}
        ],
    };
    traceModel.findOne(query, (err, find) =>{
        if(err){
            res.status(400).send(err);
        }else{
            res.status(200).send(find);
        }
    });
}

async function reAssignment(req, res){
    const { serie, equipmentName, userName, address, agreementStatus } = req.body;
    var agreeStatus;
    switch (agreementStatus){
        case "1":
            agreeStatus = "Por Asignar";
            break;
        case "2":
            agreeStatus = "Asignado";
            break;
        case "3":
            agreeStatus = "En Retiro";
            break;
        case "4":
            agreeStatus = "Retirado";
            break;
        default:
            break;
    }
    const getAddress = address.id;
    const findAddress = await addressModel.findOne({id:getAddress},'id store storeAddress -_id');
    const editAssignment = await traceModel.findOneAndUpdate({serie:serie},{equipmentName:equipmentName, userName:userName, address:findAddress, agreementStatus:agreeStatus});
    if(!editAssignment){
        res.status(400).send({msg : "Error al actualizar"});
    }else{
        res.status(200).send({msg : "Actualizado correctamente"});
    }
}

async function searchAllAssingments(req, res){
    const allAssingments = await traceModel.find();
    if(!allAssingments){
        res.status(400).send({msg : "Error en la busqueda"});
    }else{
        res.status(200).send(allAssingments)
    }
}

async function deleteAssing(req, res){
    const deleteAll = await traceModel.deleteMany();
    if(!deleteAll){
        res.status(400).send({msg : "Error al eliminar"});
    }else{
        res.status(200).send({msg : "Coleccion eliminada"});
    }
}

module.exports = {
    assignment,
    searchAssignment,
    reAssignment,
    searchAllAssingments,
    deleteAssing
}