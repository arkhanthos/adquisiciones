const RequestModel = require("../models/requestModel");
const log4 = require("log4js");
const costCenterModel = require("../models/costCenterModel");
const logger = log4.getLogger("index.js");
logger.level = "all";

async function createRequest(req, res){
    let requestMethod = [];
    let applicant = [];
    let implement = [];
    let update = [];
    let quotation = [];
    requestMethod = req.body.requestMethod;
    applicant = req.body.applicant
    implement = req.body.implement;
    update = req.body.update;
    quotation = req.body.quotation;
    const { requestId, createDate, state, costCenterApplicant } = req.body;
    const getCostCenter = costCenterApplicant[0].costCenterCode;
    const findCostCenter = await costCenterModel.findOne({costCenterCode:getCostCenter},'-_id')
    const createReq = new RequestModel({
        requestId:requestId,
        requestMethod:requestMethod,
        applicant:applicant,
        createDate:createDate,
        state:state,
        costCenterApplicant:findCostCenter,
        implement:implement,
        update:update,
        quotation:quotation
    });
    createReq.save((error) => {
        if(error){
            logger.error(error.message);
            res.status(504).send({msg : "Error al crear la solicitud"});
        }else{
            res.status(200).send(createReq);
        }
    });
}

async function deleteRequest(req, res){
    const { requestId } = req.body;
    const deleteReq = await RequestModel.deleteOne({requestId:requestId});
    if(!deleteReq){
        res.status(400).send({msg : "Error en la eliminacion"});
    }else{
        res.status(200).send(deleteReq);
    }
}

async function updateRequest(req, res){
    const { id } = req.params;
    RequestModel.findByIdAndUpdate(id, req.body,(error) => {
        if(error){
            res.status(400).send({msg : "Error al actualizar"});
        }else{
            res.status(200).send({msg : "Actualizado Correctamente"});
        }
    });
}

async function deleteAllRequest(req, res){
    const deleteAll = await RequestModel.deleteMany();
    if(!deleteAll){
        res.status(400).send({msg : "Error al borrar la coleccion"});
    }else{
        res.status(200).send({msg: "Coleccion eliminada"});
    }
}

async function findByRequestId(req,res){
    const { requestId } = req.body;
    const searchById = await RequestModel.findOne({requestId:requestId});
    if(!searchById){
        res.status(400).send({msg : "Error en la busqueda"});
    }else{
        res.status(200).send(searchById);
    }
}

async function findAll(req,res){
    const searchAll = await RequestModel.find();
    if(!searchAll){
        res.status(400).send({msg : "Error en la busqueda"});
    }else{
        res.status(200).send(searchAll);
    }
}

// function findRequest(req, res){
//     const { body } = req.body;
//     const searchRequest = {
//         $or:[
//             { requestId : { $regex : body, $options : "i"}},
//             { requestTrackingId : { $regex : body, $options : "i"}},
//             { applicant : { $regex : body, $options : "i"}},
//             { createDate : { $regex : body, $options : "i" }}
//         ],
//     };
//     RequestModel.find(searchRequest, (err, search) => {
//         if(err){
//             res.status(400).send(err);
//         }else{
//             res.status(200).send(search);
//         }
//     }); 
// }

module.exports = {
    createRequest,
    deleteRequest,
    updateRequest,
    //findRequest,
    findByRequestId,
    findAll,
    deleteAllRequest
}