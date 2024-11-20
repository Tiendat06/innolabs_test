const {check} = require('express-validator');

changeRoleValidator = [
    check('role_name')
        .trim()
        .notEmpty().withMessage('Please enter role name'),
]

module.exports = {
    changeRoleValidator,
}