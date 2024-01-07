export const swaggerDefinition = {
    openapi: '3.1.0', info: {
        title: 'Brain Agriculture API Documentation',
        version: '1.0.0',
        description: 'This is a REST API application made with Express. It retrieves data from a PostgreSQL database.',
    }, servers: [{
        url: 'http://localhost:3000', description: 'Development server',
    },], components: {
        schemas: {
            ProdutorRural: {
                type: 'object', properties: {
                    id: {
                        type: 'integer', example: 1,
                    }, name: {
                        type: 'string', example: 'Joao Bione',
                    }, cpf_cnpj: {
                        type: 'string', example: '12345678901'
                    }
                },
            },
            Cultura: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        example: 1
                    },
                    nome: {
                        type: 'string',
                        example: 'Corn'
                    }
                }
            },
            Fazenda: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        example: 1
                    },
                    nome: {
                        type: 'string',
                        example: 'Farm1'
                    },
                    cidade: {
                        type: 'string',
                        example: 'City1'
                    },
                    estado: {
                        type: 'string',
                        example: 'State1'
                    },
                    areaTotalHectares: {
                        type: 'number',
                        example: 1000
                    },
                    areaAgricultavelHectares: {
                        type: 'number',
                        example: 500
                    },
                    areaVegetacaoHectares: {
                        type: 'number',
                        example: 500
                    },
                    produtorId: {
                        type: 'number',
                        example: 1
                    }
                    }
                }
        },
    },
};
