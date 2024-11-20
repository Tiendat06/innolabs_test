const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const userMiddleWare = require('../app/middlewares/UserMiddleWare');
const checkLogin = require('../app/auth/checkLogin');
const checkRole = require('../app/auth/checkRole');
const userValidator = require('../app/validators/UserValidator');
const logValidator = require('../app/validators/LogValidator');

router.get('/', checkLogin, checkRole(['administrator']), userMiddleWare.index, userController.index);

router.patch('/:id/change-role', userValidator.changeRoleValidator, checkLogin, checkRole(['administrator']),
    userMiddleWare.change_role, userController.change_role);

router.put('/:id', logValidator.registerValidator, checkLogin, checkRole(['administrator']),
    userMiddleWare.update_user, userController.update_user)

router.delete('/:id', checkLogin, checkRole(['administrator']), userMiddleWare.delete_user, userController.delete_user);

module.exports = router;