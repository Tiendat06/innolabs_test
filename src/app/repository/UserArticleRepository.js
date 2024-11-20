const UserArticle = require('../models/UserArticle');

class UserArticleRepository {

    insertUserArticle = (data) => {
        return UserArticle.insertMany(data)
            .then(value => value)
            .catch(err => console.log(err));
    }
}

module.exports = new UserArticleRepository;