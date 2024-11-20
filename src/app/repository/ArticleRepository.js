const Article = require('../models/Article');

class ArticleRepository {

    getAllArticles = () => {
        return Article.find({deleted: false})
            .then(articles => articles)
            .catch(err => console.log(err));
    }

    getArticleById = (_id) => {
        return Article.findOne({_id, deleted: false})
            .then(article => article)
            .catch(err => console.log(err));
    }

    insertArticle = (article) => {
        return Article.insertMany(article)
            .then(value => value)
            .catch(err => console.log(err));
    }

    editArticle = ({_id, ...article}) => {
        console.log(_id, article);
        return Article.updateOne({_id, deleted: false}, {$set: article})
            .then(value => value)
            .catch(err => console.log(err));
    }

    deleteArticle = (_id, deleted=true) => {
        return Article.updateOne({_id}, {$set: {deleted: deleted, updatedAt: Date.now()}})
            .then(value => value)
            .catch(err => console.log(err));
    }
}

module.exports = new ArticleRepository;