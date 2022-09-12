const apiDoc = {
    swagger: '2.0',
    basePath: '/',
    info: {
        title: 'A proof-of-concept aggregate product data API.',
        version: '1.0.0',
    },
    definitions: {
        Product: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                    description: 'The unique product ID.'
                },
                name: {
                    type: 'string',
                    description: 'The product name.',
                },
                current_price: {
                    type: 'object',
                    properties: {
                        value: {
                            type: 'number',
                            description: 'The current price.',
                        },
                        currency_code: {
                            type: 'string',
                            description: 'The currency code.',
                        },
                    },
                },
            },
            required: ['id', 'name'],
        }
    },
    paths: {},
};

module.exports = apiDoc;
