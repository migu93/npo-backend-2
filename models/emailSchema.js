const mongoose = require('mongoose');
const {model} = require("mongoose");

const EmailSchema = new mongoose.Schema({
    email: { type: String, required: true },
});

module.exports = model('EmailSchema', EmailSchema)