const mongoose = require("mongoose");

const eqipmentAssignmentSchema = mongoose.Schema({
    post: {
        type: String,
        unique: true,
        require: true
    },
    equipment: [{
        equipmentType: String,
        brand: String,
        model: String
    }]
});

module.exports = mongoose.model("equipmentAssignment", eqipmentAssignmentSchema);