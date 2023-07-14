const mongoose = require("mongoose");

const traceSchema = mongoose.Schema({
    serie :{
        type: String,
        unique: true,
        require: true
    },
    equipmentName:{
        type: String
    },
    userName: {
        type: String
    },
    address:[{
        id: Number,
        store: String,
        storeAddress: String
    }],
    agreementStatus: {
        type: String
    }
});

module.exports = mongoose.model("Trace", traceSchema);