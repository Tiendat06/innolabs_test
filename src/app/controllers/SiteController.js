const siteService = require('../services/SiteService');

class SiteController {

    index = async (req, res, next) => {
        return await siteService.index(req, res);
    }

    add_article = async (req, res, next) => {
        return await siteService.addArticle(req, res);
    }

    edit_article = async (req, res, next) => {
        return await siteService.editArticle(req, res);
    }

    delete_article = async (req, res, next) => {
        return await siteService.deleteArticle(req, res);
    }
}

module.exports = new SiteController;