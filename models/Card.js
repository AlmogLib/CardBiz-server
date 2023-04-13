const mongoose = require("mongoose")

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
    },
    address: {
        type: String,
        required: true,
        minlength: 2,
    },
    phone: {
        type: Number,
        required: true,
        minlength: 8,
    },
    image: {
        type: String,
        required: true,
        minlength: 2,
    },
    website: {
        type: String,
        required: true,
        minlength: 2,
    },
    user_id: {
        type: String,
        minlength: 2,
    }
})

const Card = mongoose.model("card", cardSchema);
module.exports = Card;