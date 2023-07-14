const deliveryOrderModel = require("../models/deliveryOrderModel");
const storeDirecction = require("../models/addressModel");
const orderVal = require("../utils/orderValidator");
const log4 = require("log4js");
const logger = log4.getLogger("index.js");
logger.level = "all"

//Recibe campos desde el front y hace sus validaciones de campos
//Asigna los campos y los añade a la base de datos
//Regresa las correcta creacion del documento, si ocurre algun error lo regresa
async function createDeliveryOrder(req, res){
    //orderVal.validateOrder(req.body);
    var finalCondition;
    const { orderNumber, sendItems, outSerieNum, applicant, indexAddress, availabilityDate, condition } = req.body;
    switch (condition){
        case "1":
            finalCondition = "En Asignacion";
            break;
        case "2":
            finalCondition = "Asignado";
            break;
        case "3":
            finalCondition = "Retirado";
            break;
        default:
            // res.status(200).send({msg: "El valor ingresado no es valido"});
            break;
    }
    const getAddressId = indexAddress[0].id;
    const selectId = await storeDirecction.findOne({id:getAddressId},'id store storeAddress -_id');
    const createOrder = new deliveryOrderModel({
        orderNumber: orderNumber,
        sendItems: sendItems,
        outSerieNum: outSerieNum,
        applicant: applicant,
        indexAddress: selectId,
        availabilityDate: availabilityDate,
        condition: finalCondition
    });
    createOrder.save((error)=>{
        if(error){
            logger.error(error.message);
            res.status(504).send({msg : "Error al crear la orden de despacho"});
        }else{
            res.status(200).send(createOrder);
        }
    });
}

//No recibe datos del front
//Busca todos los registros de la coleccion "deliveryOrders" en la base de datos
//Lanza error si se produce algun problema, de lo contrario muestra los registros
async function findAllDeliveryOrders(req, res){
    const allDelivery = await deliveryOrderModel.find();
    if(!allDelivery){
        res.status(400).send({msg:"Error en la busqueda"});
    }else{
        res.status(200).send(allDelivery);
    }
}

//Recibe el id del registro desde la base de datos
//Carga los campos de ese registro al front y desde ahi pueden editarse
//Lanza error si se produce algun problema, de lo contrario guarda los datos y muestra el mensaje de actualizacion correcta
async function editDeliveryOrder(req, res){
    const { id } = req.params;
    deliveryOrderModel.findByIdAndUpdate(id, req.body, (error) => {
        if(error){
            res.status(400).send({msg : "Error al actualizar"});
        }
        else{
            res.status(200).send({msg : "Actualizado correctamente"});
        }
    });
}

//Recibe el numero de orden desde el front
//Busca la coincidencia exacta en ka base de datos
//Lanza error en caso de algun problema, de lo contrario muestra el elemento coincidente
async function findDeliveryByOrderNumber(req, res){
    orderVal.validateOnlyOrderNumber(req.body);
    const { orderNumber } = req.body;
    const findOrderNumber = await deliveryOrderModel.findOne({orderNumber}, '-_id -__v');
    if(!findOrderNumber){
        res.status(400).send({msg: "Error en la busqueda"});
    }else{
        res.status(200).send(findOrderNumber);
    }
}

//Recibe el numero de serie desde el front
//Busca una coincidencia de este campo en la base de datos
//Lanza error si hay algun problema, de caso contrario muestra el campo asociado
async function findDeliveryBySerieNum(req, res){
    //orderVal.validateOnlySendItems(req.body);
    const { serieNum } = req.body;
    const findSeries = await deliveryOrderModel.find({serieNum:{$regex: serieNum}},'-_id -__v');
    if(!findSeries){
        res.status(400).send({msg: "Error en la busqueda"});
    }else{
        res.status(200).send(findSeries);
    }
}

//Recibe el usuario final del front
//Busca coincidencias en la base de datos con el campo indicado
//Lanza error si ocurre algun problema, de caso contrario muestra todos los registros coincidentes
async function findDeliveryByFinalUser(req, res){
    const { finalUser } = req.body;
    const findByFinalUser = await deliveryOrderModel.find({finalUser:{$regex: finalUser}},'-_id -__v');
    if(!findByFinalUser){
        res.status(400).send({msg: "Error en la busqueda"});
    }else{
        res.status(200).send(findByFinalUser);
    }
}

async function deleteOrder(req, res){
    //validateTax.validateDocNumber(req.body);
    const docNumber = req.body;
    const deleteDeliveryOrder = await deliveryOrderModel.deleteOne(docNumber);
    if(!deleteDeliveryOrder){
        res.status(400).send({msg:"Error en la eliminacion"});
    }else{
        res.status(200).send(deleteDeliveryOrder);
    }
}
function searchAnyDelivery(req, res){
    const { body } = req.body;
    const searchQuery = {
        $or:[
            { orderNumber : body },
            { applicant : {$regex: body, $options : "i"}},
            { availabilityDate : {$regex: body, $options : "i"}}
        ],
    };
    deliveryOrderModel.find(searchQuery,(err, result) => {
        if (err) {
            res.status(400).send(err);
        }else {
            res.status(200).send(result);
        }
    })
}

module.exports = {
    createDeliveryOrder,
    findAllDeliveryOrders,
    editDeliveryOrder,
    findDeliveryByOrderNumber,
    findDeliveryBySerieNum,
    findDeliveryByFinalUser,
    deleteOrder,
    searchAnyDelivery
} 