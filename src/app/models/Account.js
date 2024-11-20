const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Account = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    role_id: {type: Schema.Types.ObjectId, ref: 'Role', required: true},
    password: {type: String, required: true, minlength: 6},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false},
});

module.exports = mongoose.model('Account', Account, 'account');