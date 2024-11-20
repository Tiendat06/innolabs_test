const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Article = new Schema({
    content: {type: String, required: true},
    title: {type: String, required: true},
    author_name: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false},
});

module.exports = mongoose.model('Article', Article, 'article');