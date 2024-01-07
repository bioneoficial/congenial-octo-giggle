DROP TABLE IF EXISTS culturas_fazenda;
DROP TABLE IF EXISTS culturas;
DROP TABLE IF EXISTS fazendas;
DROP TABLE IF EXISTS produtores_rurais;

CREATE TABLE produtores_rurais
(
    id       SERIAL PRIMARY KEY,
    cpf_cnpj VARCHAR(14) UNIQUE NOT NULL,
    nome     VARCHAR(255)       NOT NULL
);

CREATE TABLE fazendas
(
    id                         SERIAL PRIMARY KEY,
    nome                       VARCHAR(255) NOT NULL,
    cidade                     VARCHAR(255) NOT NULL,
    estado                     VARCHAR(255) NOT NULL,
    area_total_hectares        DECIMAL      NOT NULL,
    area_agricultavel_hectares DECIMAL      NOT NULL,
    area_vegetacao_hectares    DECIMAL      NOT NULL,
    produtor_id                INTEGER REFERENCES produtores_rurais (id)
);

CREATE TABLE culturas
(
    id   SERIAL PRIMARY KEY,
    nome VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE culturas_fazenda
(
    fazenda_id INTEGER REFERENCES fazendas (id),
    cultura_id INTEGER REFERENCES culturas (id),
    PRIMARY KEY (fazenda_id, cultura_id)
);

INSERT INTO culturas (nome)
VALUES ('Soja'),
       ('Milho'),
       ('Algodão'),
       ('Café'),
       ('Cana de Açucar');

CREATE INDEX idx_cpf_cnpj ON produtores_rurais (cpf_cnpj);
CREATE INDEX idx_produtor_id ON fazendas (produtor_id);
CREATE INDEX idx_fazenda_id ON culturas_fazenda (fazenda_id);
CREATE INDEX idx_cultura_id ON culturas_fazenda (cultura_id);

