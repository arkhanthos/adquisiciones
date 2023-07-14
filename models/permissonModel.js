const mongoose = require("mongoose");

const accsessModelSchema = mongoose.Schema({
    code: {
        type: String,
        require: true,
        unique: true
    },
    namePermisson: {
        type: String,
        require: true,
        unique: true
    }
});

module.exports = mongoose.model("accsessModel", accsessModelSchema);