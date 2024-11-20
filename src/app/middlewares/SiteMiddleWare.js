const {validationResult} = require("express-validator");

class SiteMiddleWare {

    index = (req, res, next) => {
        next();
    }

    add_article = (req, res, next) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            let error = result.array()[0].msg;
            req.flash('error', error);
        }
        next();
    }

    edit_article = (req, res, next) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            let error = result.array()[0].msg;
            req.flash('error', error);
        }
        next();
    }

    delete_article = (req, res, next) => {
        next();
    }
}

module.exports = new SiteMiddleWare;