const mongoose = require("mongoose");

const deliveryOrderSchema = mongoose.Schema({
    orderNumber:{
        type: Number,
        unique: true,
        require: true
    },
    sendItems : [{
        serieNum:{
            type: String,
            unique: true,
            require: true,
        },
        finalUser:{
            type: String
        },
        contactPhone:{
            type: String
        }
    }],
    outSerieNum:{
        type: String,
        unique: true
    },
    applicant:{
        type: String
    },
    indexAddress:[{
        id: Number,
        store: String,
        storeAddress: String
    }],
    availabilityDate:{
        type: String
    },
    condition:{
        type: String
    }
});

module.exports = mongoose.model("deliveryOrder", deliveryOrderSchema);

//SI SE REALIZA UN CAMBIO A SCHEMA (AGREGAR O ELIMINAR UN PARAMETRO) DEBE BORRAR LA COLECCION DE LA BASE DE DATOS!!
