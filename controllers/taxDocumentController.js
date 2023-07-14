const TaxDocument = require("../models/taxDocumentModel");
const validateTax = require("../utils/taxValidator");
const log4 = require("log4js");
const taxDocumentModel = require("../models/taxDocumentModel");
const logger = log4.getLogger("index.js");
logger.level = "all"

//Recibe datos desde el front
//Valida y guarda los datos ingresados en la base de datos
//Lanza error si ocurre algun problema, de caso contrario muestra el registro recien ingresado
function createTaxDoc(req, res){
    //validateTax.validateTax(req.body);
    const { docNumber, emissionDate, docType, supplier, recivedItems, applicant } = req.body;
    const createTax = new TaxDocument({
        docNumber: docNumber,
        emissionDate: emissionDate,
        docType: docType,
        supplier: supplier,
        recivedItems: recivedItems,
        applicant: applicant
    });
    createTax.save((error) => {
        if(error){
            logger.error(error.message);
            res.status(504).send({msg:"Error al crear el documento", code: 2001});
        }else{
            res.status(200).send(createTax);
        }
    });
}

//No recibe datos del fornt
//Busca todos los registros de la coleccion TaxDocuments
//Lanza error si se produce algun problema en la busqueda, de caso contrario muestra todos los registros
async function findAllDocuments(req, res){
    const allDocuments = await TaxDocument.find();
    if(!allDocuments){
        res.status(400).send({msg:"Error en la busqueda"});
    }else{
        res.status(200).send(allDocuments);
    }
}

function searchSelfTax(req, res){
    const { applicant } = req.body;
    const selfTax = TaxDocument.find({applicant: applicant});
    if(!selfTax){
        res.status(400).send({msg: "Error en la busqueda"});
    }else{
        res.status(200).send(selfTax);
    }
}

//Obtiene el numero de documento del font
//Realiza la validacion del campo y busca la coincidencia exacta en la base de datos
//Lanza error si ocurre algun problema, de caso contrario muestra el documento asociado a la coincidencia
async function findByDocNumber(req, res){
    validateTax.validateDocNumber(req.body);
    const { docNumber } = req.body;
    const findDocNumber = await TaxDocument.findOne({docNumber},'-_id -__v');
    if(!findDocNumber){
        res.status(400).send({msg:"Error en la busqueda"});
    }else{
        res.status(200).send(findDocNumber);
    }
}

//Obtiene la fecha de emision del documento del font
//Realiza la validacion del campo y busca las coincidencias en la base de datos
//Lanza error si ocurre algun problema, de caso contrario muestra los documentos asociados a las coincidencia
async function findByEmissionDate(req, res){
    validateTax.validateEmissionDate(req.body);
    const { emissionDate } = req.body;
    const findEmissionDate = await TaxDocument.find({emissionDate},'-_id -__v');
    if(!findEmissionDate){
        res.status(400).send({msg:"Error en la Busqueda"});
    }else{
        res.status(200).send(findEmissionDate);
    }
}

//Obtiene el tipo de documento del font
//Realiza la validacion del campo y busca las coincidencias en la base de datos
//Lanza error si ocurre algun problema, de caso contrario muestra los documentos asociados a la coincidencia
async function findByDocType(req, res){
    validateTax.validateDocType(req.body);
    const { docType } = req.body;
    const findDocType = await TaxDocument.find({docType},'-_id -__v');
    if(!findDocType){
        res.status(400).send({msg:"Error en la busqueda"});
    }else{
        logger.trace(req.user);
        res.status(200).send(findDocType);
    }
}

//Obtiene el proveedor del font
//Realiza la validacion del campo y busca las coincidencias la base de datos
//Lanza error si ocurre algun problema, de caso contrario muestra los documentos asociados a la coincidencia
async function findBySupplier(req, res){
    validateTax.validateSupplier(req.body); 
    const { supplier } = req.body;
    const findSupplier = await TaxDocument.find({supplier},'-_id -__v');
    if(!findSupplier){
        res.status(400).send({msg:"Error en la bsuqueda"});
    }else{
        res.status(200).send(findSupplier);
    }
}

//Obtiene el numero de serie del font
//Realiza la validacion del campo y busca la coincidencia exacta en la base de datos
//Lanza error si ocurre algun problema, de caso contrario muestra el documento asociado a la coincidencia
async function findBySeries(req, res){
    validateTax.validateSeries(req.body);
    const { serie } = req.body;
    const findSeries = await TaxDocument.find({series:{$regex: serie}},'-_id -__v');
    if(!findSeries){
        res.status(400).send({msg:"Error en la busqueda"});
    }else{
        res.status(200).send(findSeries);
    } 
}

//Obtiene el usuario final desde el font
//Realiza la validacion del campo y busca la coincidencia exacta en la base de datos
//Lanza error si ocurre algun problema, de caso contrario muestra el documento asociado a la coincidencia
async function findByFinalUser(req, res){
    const { finalUser } = req.body;
    const findByUser = await TaxDocument.find({finalUser:{$regex: finalUser}},'-_id -__v');
    if(!findByUser){
        res.status(400).send({msg:"Error en la busqueda"});
    }else{
        res.status(200).send(findByUser);
    }
}

//Obtiene el id asociado a la base de datos desde la url
//Carga los datos de ese id al front y permite editarlos y guardarlos
//Lanza error si ocurre algun problema, de caso contrario muestra el mensaje de actualizacion correcta
//TODO: NECESITAS ENLAZAR EL DOCUMENTO TRIBUTARIO A LA NUEVA FACTURA O GUIA Y LUEGO HACER EL CAMBIO TODO:
async function editTaxDoc(req, res){
    const { _id } = req.params;
    const getDocument = await TaxDocument.findById({id:_id});
    const listId = [];
    const listImplementType = [];
    const listSerie = [];
    for(let i = 0; i < getDocument.recivedItems.length; i++){
        listId.push(getDocument.recivedItems[i]._id);
        listImplementType.push(getDocument.recivedItems[i].implementType);
        listSerie.push(getDocument.recivedItems[i].serie);
        TaxDocument.findByIdAndUpdate(id, req.body, (error) =>{
            if(error){
                res.status(400).send({msg:"Error al Actualizar "});
            }else{
                res.status(200).send(getDocument);
            }
        });
    }
}

//Obtiene el numero de documento del font
//Realiza la validacion del campo y busca la coincidencia exacta en la base de datos
//Lanza error si ocurre algun problema, de caso contrario muestra el documento asociado a la coincidencia que se a borrado
async function deleteDoc(req, res){
    validateTax.validateDocNumber(req.body);
    const orderNumber = req.body;
    const deleteAllDocuments = await TaxDocument.deleteOne(orderNumber);
    if(!deleteAllDocuments){
        res.status(400).send({msg:"Error en la eliminacion"});
    }else{
        res.status(200).send(deleteAllDocuments);
    }
}

function searchAny(req, res){
    const { body } = req.body;
    const query = {
        $or:[
            { docNumber : { $regex: body, $options : "i"}},
            { emissionDate : { $regex: body, $options : "i"}},
            { docType : { $regex: body, $options : "i"}},
            { supplier : { $regex: body, $options : "i"}}
        ],
    };
    taxDocumentModel.find(query, (err, search) => {
        if (err) {
            res.status(400).send(err);
        }else{
            res.status(200).send(search);
        }
    });
}

module.exports = {
    createTaxDoc,
    findAllDocuments,
    findByDocNumber,
    findByEmissionDate,
    findByDocType,
    findBySupplier,
    findBySeries,
    findByFinalUser,
    deleteDoc,
    editTaxDoc,
    searchAny,
    searchSelfTax
}