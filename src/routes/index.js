const siteRouter = require('./site');
const logRouter = require('./log');
const userRouter = require('./user');
const swagger_jsdoc = require('swagger-jsdoc');
const swagger_ui = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger-api.yml');

function route(app) {
    app.use('/api-docs', swagger_ui.serve, swagger_ui.setup(swaggerDocument));
    app.use('/log', logRouter);
    app.use('/user', userRouter);
    app.use('/', siteRouter);
}

module.exports = route;