const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    isBusiness: {
        type: Boolean,
        required: true,
    }
})

const User = mongoose.model("user", userSchema);
module.exports = User;