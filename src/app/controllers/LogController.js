const logService = require('../services/LogService');

class LogController {

    // [POST] /log/login
    login_POST = async (req, res, next) => {
        return await logService.checkLogin(req, res);
    }

    // [POST] /log/register
    register_POST = async (req, res, next) => {
        return await logService.register(req, res);
    }

    // [POST] /log/forgot-password
    forgot_password = async (req, res, next) => {
        return await logService.forgotPassword(req, res);
    }
}

module.exports = new LogController;