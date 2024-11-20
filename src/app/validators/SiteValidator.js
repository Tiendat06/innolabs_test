const {check} = require('express-validator');

checkArticleInput = [
    check('title')
        .trim()
        .notEmpty().withMessage('Title is required'),
    check('content')
        .trim()
        .notEmpty().withMessage('Content is required'),
    check('author_name')
        .trim()
        .notEmpty().withMessage('Author name is required'),
];

module.exports = {
    checkArticleInput,
}