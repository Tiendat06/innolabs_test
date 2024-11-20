const {engine} = require('express-handlebars');

function handlebars(app) {
    app.engine('hbs', engine({
        extname: '.hbs',
        helpers: {

        }
    }))
}

module.exports = handlebars;