var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { initialize } = require("express-openapi");
var swaggerUi = require('swagger-ui-express');

var app = express();

app.listen(8080);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

initialize({
    app,
    apiDoc: require('./api/api-doc'),
    paths: './api/paths',
})

app.use(
    '/api-documentation',
    swaggerUi.serve,
    swaggerUi.setup(null, {
        swaggerOptions: {
            url: 'http://localhost:8080/api-docs',
        },
    }),
)

console.log('App running on http://localhost:8080');
console.log('See documentation in http://localhost:8080/api-documentation');

module.exports = app;
