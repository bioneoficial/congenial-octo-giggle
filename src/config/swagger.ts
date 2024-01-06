export const swaggerDefinition = {
    openapi: '3.1.0',
    info: {
        title: 'Brain Agriculture API Documentation',
        version: '1.0.0',
        description: 'This is a REST API application made with Express. It retrieves data from a PostgreSQL database.',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
    components: {
        schemas: {
            ProdutorRural: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        example: 1,
                    },
                    name: {
                        type: 'string',
                        example: 'Joao Bione',
                    },
                },
            },
        },
    },
};
