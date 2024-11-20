const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserLog = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    previous_fullName: {type: String},
    previous_email: {type: String},
    previous_phone: {type: String},
    previous_password: {type: String},
    process: {type: String},
    updatedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('UserLog', UserLog, 'user_log');