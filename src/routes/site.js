const express = require('express');
const router = express.Router();
const siteMiddleWare = require('../app/middlewares/SiteMiddleWare');
const siteController = require('../app/controllers/SiteController');
const checkLogin = require('../app/auth/checkLogin');
const checkRole = require('../app/auth/checkRole');
const siteValidator = require('../app/validators/SiteValidator');

router.get('/', checkLogin, siteMiddleWare.index, siteController.index);

router.post('/add', siteValidator.checkArticleInput, checkLogin, checkRole(['administrator', 'editor']),
    siteMiddleWare.add_article, siteController.add_article);

router.put('/edit/:id', siteValidator.checkArticleInput, checkLogin, checkRole(['administrator', 'editor']), siteMiddleWare.edit_article, siteController.edit_article)

router.delete('/delete/:id', checkLogin, checkRole(['administrator', 'editor']), siteMiddleWare.delete_article, siteController.delete_article)

module.exports = router;
