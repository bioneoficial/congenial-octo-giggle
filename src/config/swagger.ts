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
            },
            GetProdutorRural: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        example: 1
                    },
                    cpf_cnpj: {
                        type: 'string',
                        example: '12345678901'
                    },
                    nome: {
                        type: 'string',
                        example: 'João Bione'
                    },
                    created_at: {
                        type: 'string',
                        example: '2023-01-14T03:20:00Z',
                        format: 'date-time',
                        description: 'Timestamp denoting when the record was created.'
                    },
                    updated_at: {
                        type: 'string',
                        example: '2023-01-14T03:20:00Z',
                        format: 'date-time',
                        description: 'Timestamp denoting the last update made to the record.',
                    },
                    idFazenda: {
                        type: 'integer',
                        example: 1
                    },
                    nomeFazenda: {
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
                    culturas: {
                        type: 'array',
                        items: {
                            type: 'integer'
                        },
                        example: [1, 2, 3]
                    }
                },
            },
            IProdutorRuralPut: {
                type: 'object',
                properties: {
                    produtorId: {
                        type: 'integer',
                        example: 1
                    },
                    cpf_cnpj: {
                        type: 'string',
                        example: '123.456.789-00'
                    },
                    nome: {
                        type: 'string',
                        example: 'New Produtor Name'
                    },
                    nomeFazenda: {
                        type: 'string',
                        example: 'New Fazenda Name'
                    },
                    fazendaId: {
                        type: 'integer',
                        example: 1
                    },
                    cidade: {
                        type: 'string',
                        example: 'New City'
                    },
                    estado: {
                        type: 'string',
                        example: 'New State'
                    },
                    areaTotalHectares: {
                        type: 'number',
                        example: 1000
                    },
                    areaAgricultavelHectares: {
                        type: 'number',
                        example: 700
                    },
                    areaVegetacaoHectares: {
                        type: 'number',
                        example: 300
                    },
                    culturas: {
                        type: 'array',
                        items: {
                            type: 'integer'
                        },
                        example: [1, 2, 3]
                    }
                },
            }
        },
    },
}
