const mongoose = require("mongoose");

const costCenterSchema = mongoose.Schema({
    costCenterCode :{
        type : Number,
        unique : true,
        require : true
    },
    costCenterName:{
        type : String,
        unique : true,
        require : true
    }
});

module.exports = mongoose.model("costCenter", costCenterSchema);