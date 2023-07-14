const Provider = require("../models/providerModel");
const mdw = require("../middlewares/authMiddleware");

function addProvider(req, res){
    const { id, providerName, providerContact } = req.body;
    const addProv = new Provider({
        id:id,
        providerName:providerName,
        providerContact:providerContact
    });
    addProv.save((error) => {
        if(error){
            res.status(504).send({msg : "Error al crear al proveedor"})
        }else{
            res.status(200).send({msg : "Registro creado correctamente"})
        }
    });
}

async function editProvider(req, res){
    const { id } = req.params;
    await Provider.findByIdAndUpdate(id, req.body, (error) => {
        if(error){
            res.status(400).send({msg : "Error al actualizar"});
        }else{
            res.status(200).send({msg : "Actualizado correctamente"});
        }
    });
}

async function deleteProvider(req, res){
    const { id } = req.body;
    const deleteProv = await Provider.deleteOne({id:id});
    if(!deleteProv){
        res.status(400).send({msg : "Error en la eliminacion"});
    }else{
        res.status(200).send(deleteProv);
    }
}

async function searchProvider(req, res){
    const allProviders = await Provider.find();
    if(!allProviders){
        res.status(400).send({msg : "Error en la busqueda"});
    }else{
        res.status(200).send(allProviders);
    }
} 

module.exports = {
    addProvider,
    editProvider,
    deleteProvider,
    searchProvider
}