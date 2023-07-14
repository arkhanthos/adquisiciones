const mdw = require("../middlewares/authMiddleware");
const costCenter = require("../models/costCenterModel");

function addCostCenter(req, res){
    const { costCenterCode, costCenterName } = req.body;
    const addCenter = new costCenter({
        costCenterCode : costCenterCode,
        costCenterName : costCenterName
    });
    addCenter.save((error) => {
        if(error){
            res.status(504).send({msg : "Error al crear el centro de costos"});
        }else{
            res.status(200).send({msg : "Centro de costo creado correctamente"});
        }
    })
}

async function deleteCostCenter(req, res){
    const { costCenterCode } = req.body;
    const deleteCenter = await costCenter.deleteOne({costCenterCode:costCenterCode});
    if(!deleteCenter){
        res.status(400).send({msg : "Error al borrar centro de costo"});
    }else{
        res.status(200).send(deleteCenter);
    }
}

async function searchCostCenter(req, res){
    const allCostCenter = await costCenter.find();
    if(!allCostCenter){
        res.status(400).send({msg : "Error en la busqueda"});
    }else{
        res.status(200).send(allCostCenter);
    }
}

async function editCostCenter(req, res){
    const { id } = req.params;
    await costCenter.findByIdAndUpdate(id, req.body, (error) => {
        if(error){
            res.status(400).send({msg : "Error en la actualizacion"});
        }else{
            res.status(200).send({msg : "Actualizado correctamente"});
        }
    });
}

module.exports = {
    addCostCenter,
    deleteCostCenter,
    searchCostCenter,
    editCostCenter
}