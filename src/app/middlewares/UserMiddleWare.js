const {validationResult} = require("express-validator");

class UserMiddleWare {

    index = (req, res, next) => {
        next();
    }

    change_role = (req, res, next) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            let error = result.array()[0].msg;
            req.flash('error', error);
        }
        next();
    }

    update_user = (req, res, next) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            let error = result.array()[0].msg;
            req.flash('error', error);
        }
        next();
    }

    delete_user = (req, res, next) => {
        next();
    }

}

module.exports = new UserMiddleWare;