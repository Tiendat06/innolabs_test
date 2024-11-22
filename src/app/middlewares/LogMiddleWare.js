const {validationResult} = require("express-validator");
const userRepository = require('../repository/UserRepository')

class LogMiddleWare {

    login_POST = (req, res, next) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            let error = result.array()[0].msg;
            req.flash('error', error);
        }
        next();
    }

    register_POST = async (req, res, next) => {
        const result = validationResult(req);
        const {email} = req.body;
        let error = '';
        if(!result.isEmpty()){
            error = result.array()[0].msg;
            req.flash('error', error);
        } else if(await userRepository.getUserByEmail(email)){
            error = 'Email is exists';
            req.flash('error', error);
        }
        next();
    }

    forgot_password = async (req, res, next) => {
        const result = validationResult(req);
        const {email} = req.body;
        let error = '';
        if(!result.isEmpty()){
            let error = result.array()[0].msg;
            req.flash('error', error);
        } else if(!await userRepository.getUserByEmail(email)){
            error = 'Email is not exists';
            req.flash('error', error);
        }
        next();
    }
}

module.exports = new LogMiddleWare;