const storeDirecction = require("../models/addressModel");
const mdw = require("../middlewares/authMiddleware");
const validateAddres = require("../utils/addressValidator");

//Recibe campos ingresados por usuario
//Usa la funcion de mongoose para crear la tienda
//Muestra mensaje correspondiente de creacion o error
function createAddress(req, res){
    //validateAddres.validateCreateAddress(req.body);
    const { id, store, storeAddress } = req.body;
    const addStore = new storeDirecction({
        id: id,
        store: store,
        storeAddress: storeAddress
    });
    addStore.save((error)=>{
        if(error){
            res.status(504).send({msg : "Error al crear la direccion"});
        }else{
            res.status(200).send({msg: "Registro creado correctamente"});
        }
    });
}

//No recibe datos del front
//Busca todas las tiendas en la base de datos
//Muestra todas las tiendas o lanza error en la busqueda
async function findAllStores(req, res){
    const allStores = await storeDirecction.find();
    if(!allStores){
        res.status(400).send({msg:"Error en la busqueda"});
    }else{
        res.status(200).send(allStores);
    }
}

//Recibe un id del front
//Busca y borra el registro asociado al id
//lanza un mensaje de eliminacion de registro o error
async function deleteStore(req, res){
    validateAddres.validateDeleteStore(req.body);
    const _id = req.body;
    const deleteStore = await storeDirecction.deleteOne(_id);
    if(!deleteStore){
        res.status(400).send({msg:"Error en la eliminacion"});
    }else{
        res.status(200).send(deleteStore);
    }
}

//Recibe el id del registro desde la url y el id creado por la base de datos
//Busca el registro asociado y actualiza por los datos enviados en el front
//Lanza mensaje de actualizacion correcta o error
async function editStore(req, res){
    const { id } = req.params;
    storeDirecction.findByIdAndUpdate(id, req.body, (error) => {
        if(error){
            res.status(400).send({msg : "Error al actualizar"});
        }
        else{
            res.status(200).send({msg : "Actualizado correctamente"});
        }
    });
}
module.exports = {
    createAddress,
    findAllStores,
    deleteStore,
    editStore
}
