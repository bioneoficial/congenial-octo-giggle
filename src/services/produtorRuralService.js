"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutorRuralService = void 0;
const produtorRuralRepository_1 = require("../repositories/produtorRuralRepository");
class ProdutorRuralService {
    constructor() {
        this.produtorRuralRepository = new produtorRuralRepository_1.ProdutorRuralRepository();
    }
    async findAllProdutores() {
        // Aqui você chamaria o método do repositório para obter todos os produtores
        return this.produtorRuralRepository.findAll();
    }
    async findProdutorById(id) {
        // Método para buscar um produtor pelo ID
        return this.produtorRuralRepository.findById(id);
    }
    async createProdutor(produtor) {
        // Método para criar um novo produtor
        return this.produtorRuralRepository.create(produtor);
    }
    async updateProdutor(id, produtorData) {
        // Método para atualizar um produtor existente
        return this.produtorRuralRepository.update(id, produtorData);
    }
    async deleteProdutor(id) {
        // Método para deletar um produtor
        await this.produtorRuralRepository.delete(id);
    }
}
exports.ProdutorRuralService = ProdutorRuralService;
