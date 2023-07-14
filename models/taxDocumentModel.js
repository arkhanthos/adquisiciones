const mongoose = require("mongoose");

const taxDocumentSchema = mongoose.Schema({
    docNumber: {
        type: String,
        unique: true,
        trim: true,
        require: true
    },
    emissionDate: String,
    docType: {
        type: String,
        require: true
    },
    supplier:{
        type: String,
        require: true
    },
    recivedItems: [{
        implementType: String,
        serie : String,
        finalUser : String
    }],
    appicant:{
        type: String,
        require: true
    }
});

module.exports = mongoose.model("TaxDocument", taxDocumentSchema);