const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        default: "user"
    },
    active: {
        type: Boolean,
        default: false
    },
    password: String,
    avatar: String
});


module.exports = mongoose.model("User", UserSchema);