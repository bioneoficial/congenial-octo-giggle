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
                    },
                    created_at: {
                        type: 'string',
                        example: '2023-01-14T03:20:00Z',
                        format: 'date-time',
                        description: 'Timestamp denoting when the record was created.',
                    },
                    updated_at: {
                        type: 'string',
                        example: '2023-01-14T03:20:00Z',
                        format: 'date-time',
                        description: 'Timestamp denoting the last update made to the record.',
                    },
                    deleted_at: {
                        type: 'string',
                        nullable: true,
                        example: '2023-01-14T03:20:00Z',
                        format: 'date-time',
                        description: 'Timestamp denoting when the record was deleted.',
                    },
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
                    },
                    created_at: {
                        type: 'string',
                        example: '2023-01-14T03:20:00Z',
                        format: 'date-time',
                        description: 'Timestamp denoting when the record was created.',
                    },
                    updated_at: {
                        type: 'string',
                        example: '2023-01-14T03:20:00Z',
                        format: 'date-time',
                        description: 'Timestamp denoting the last update made to the record.',
                    },
                    deleted_at: {
                        type: 'string',
                        nullable: true,
                        example: '2023-01-14T03:20:00Z',
                        format: 'date-time',
                        description: 'Timestamp denoting when the record was deleted.',
                    },
                    }
                }
        },
    },
};
