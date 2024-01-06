-- Criação das tabelas para o desafio Brain Agriculture

-- Tabela de Produtores Rurais
CREATE TABLE produtores_rurais (
    id SERIAL PRIMARY KEY,
    cpf_cnpj VARCHAR(14) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL
);

-- Tabela de Fazendas
CREATE TABLE fazendas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL,
    estado VARCHAR(255) NOT NULL,
    area_total_hectares DECIMAL NOT NULL,
    area_agricultavel_hectares DECIMAL NOT NULL,
    area_vegetacao_hectares DECIMAL NOT NULL,
    produtor_id INTEGER REFERENCES produtores_rurais(id)
);

-- Tabela de Culturas
CREATE TABLE culturas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) UNIQUE NOT NULL
);

-- Tabela de Culturas por Fazenda
CREATE TABLE culturas_fazenda (
    fazenda_id INTEGER REFERENCES fazendas(id),
    cultura_id INTEGER REFERENCES culturas(id),
    PRIMARY KEY (fazenda_id, cultura_id)
);