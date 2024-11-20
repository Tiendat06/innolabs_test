const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false},
});

module.exports = mongoose.model('User', User, 'user');