const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserArticle = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    article_id: {type: Schema.Types.ObjectId, ref: 'Article', required: true},
    previous_title: {type: String},
    previous_content: {type: String},
    previous_author_name: {type: String},
    process: {type: String, required: true},
    updatedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('UserArticle', UserArticle, 'user_article');