const {check} = require('express-validator');

loginValidator = [
    check('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({min: 6}).withMessage('Password must be at least 6 characters'),
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
];

registerValidator = [
    check('fullName')
        .trim()
        .notEmpty().withMessage('Name is required'),
    check('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({min: 6}).withMessage('Password must be at least 6 characters'),
    check('phone')
        .trim()
        .notEmpty().withMessage('Phone number is required'),
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
];

emailValidator = [
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
]

module.exports = {
    loginValidator,
    registerValidator,
    emailValidator
}