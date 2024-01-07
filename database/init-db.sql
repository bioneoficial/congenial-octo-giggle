DROP TRIGGER IF EXISTS update_timestamp ON produtores_rurais;
DROP TRIGGER IF EXISTS update_timestamp ON fazendas;
DROP FUNCTION IF EXISTS update_timestamp_column;
DROP TABLE IF EXISTS culturas_fazenda;
DROP TABLE IF EXISTS culturas;
DROP TABLE IF EXISTS fazendas;
DROP TABLE IF EXISTS produtores_rurais;

CREATE OR REPLACE FUNCTION update_timestamp_column()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE produtores_rurais
(
    id       SERIAL PRIMARY KEY,
    cpf_cnpj VARCHAR(14) UNIQUE NOT NULL,
    nome     VARCHAR(255)       NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
);

CREATE TRIGGER update_timestamp
    BEFORE UPDATE ON produtores_rurais
    FOR EACH ROW
EXECUTE FUNCTION update_timestamp_column();

CREATE TABLE fazendas
(
    id                         SERIAL PRIMARY KEY,
    nome                       VARCHAR(255) NOT NULL,
    cidade                     VARCHAR(255) NOT NULL,
    estado                     VARCHAR(255) NOT NULL,
    area_total_hectares        DECIMAL      NOT NULL,
    area_agricultavel_hectares DECIMAL      NOT NULL,
    area_vegetacao_hectares    DECIMAL      NOT NULL,
    produtor_id                INTEGER REFERENCES produtores_rurais (id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
);

CREATE TRIGGER update_timestamp
    BEFORE UPDATE ON fazendas
    FOR EACH ROW
EXECUTE FUNCTION update_timestamp_column();

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

INSERT INTO produtores_rurais (cpf_cnpj, nome)
VALUES  ('12345678901', 'João Silva'),
        ('23456789012', 'Maria Santos'),
        ('34567890123', 'Carlos Pereira');

INSERT INTO fazendas (nome, cidade, estado, area_total_hectares, area_agricultavel_hectares, area_vegetacao_hectares, produtor_id)
VALUES  ('Fazenda A', 'Cidade X', 'Estado Y', 500, 300, 200, 1),
        ('Fazenda B', 'Cidade W', 'Estado Z', 600, 400, 200, 2),
        ('Fazenda C', 'Cidade V', 'Estado U', 700, 500, 200, 3);

INSERT INTO culturas_fazenda (fazenda_id, cultura_id)
VALUES  (1, 1),
        (1, 2),
        (1, 3),
        (2, 3),
        (2, 4),
        (2, 5),
        (3, 1),
        (3, 5);

CREATE INDEX idx_cpf_cnpj ON produtores_rurais (cpf_cnpj);
CREATE INDEX idx_produtor_id ON fazendas (produtor_id);
CREATE INDEX idx_fazenda_id ON culturas_fazenda (fazenda_id);
CREATE INDEX idx_cultura_id ON culturas_fazenda (cultura_id);

