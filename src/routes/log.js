const express = require('express');
const router = express.Router();
const logMiddleware = require('../app/middlewares/LogMiddleWare');
const logController = require('../app/controllers/LogController');
const logValidator = require("../app/validators/LogValidator");

router.post('/login', logMiddleware.login_POST, logController.login_POST);

router.post('/register', logValidator.registerValidator, logMiddleware.register_POST, logController.register_POST);

router.post('/forgot-password', logValidator.emailValidator, logMiddleware.forgot_password, logController.forgot_password)

module.exports = router;