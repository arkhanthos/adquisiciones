const mongoose = require("mongoose")

const providerSchema = mongoose.Schema({
    id:{
        type : Number,
        unique: true,
        require: true
    },
    providerName:{
        type: String,
        unique: true,
        require: true
    },
    providerContact:[{
        nameContact : String,
        emailContact : String
    }]
});


module.exports = mongoose.model("Provider", providerSchema);