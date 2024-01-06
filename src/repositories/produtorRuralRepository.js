"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutorRuralRepository = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
class ProdutorRuralRepository {
    constructor() {
        this.db = dbConfig_1.default.getInstance();
    }
    async findAll() {
        const query = 'SELECT * FROM produtores_rurais;';
        const result = await this.db.executeQuery(query);
        return result.rows;
    }
    async findById(id) {
        const query = 'SELECT * FROM produtores_rurais WHERE id = $1;';
        const result = await this.db.executeQuery(query, [id]);
        if (result.rows.length === 0)
            return null;
        return result.rows[0];
    }
    async create(produtor) {
        const query = 'INSERT INTO produtores_rurais (cpf_cnpj, nome) VALUES ($1, $2) RETURNING *;';
        const values = [produtor.cpf_cnpj, produtor.nome];
        const result = await this.db.executeQuery(query, values);
        return result.rows[0];
    }
    async update(id, produtorData) {
        const query = 'UPDATE produtores_rurais SET cpf_cnpj = $1, nome = $2 WHERE id = $3 RETURNING *;';
        const values = [produtorData.cpf_cnpj, produtorData.nome, id];
        const result = await this.db.executeQuery(query, values);
        if (result.rows.length === 0)
            return null;
        return result.rows[0];
    }
    async delete(id) {
        const query = 'DELETE FROM produtores_rurais WHERE id = $1;';
        await this.db.executeQuery(query, [id]);
    }
}
exports.ProdutorRuralRepository = ProdutorRuralRepository;
