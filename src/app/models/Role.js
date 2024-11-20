const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role = new Schema({
    role_name: {type: String, required: true, maxLength: 100},
});

module.exports = mongoose.model('Role', Role, 'role');