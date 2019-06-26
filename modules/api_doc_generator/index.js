const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api-doc');

module.exports = {
    swaggerUiServer:swaggerUi.serve,
    SwaggerUiSetup: swaggerUi.setup(swaggerDocument)
};

