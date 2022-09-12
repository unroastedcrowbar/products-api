const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { initialize } = require("express-openapi");
const swaggerUi = require('swagger-ui-express');

const app = express();

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
