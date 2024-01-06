"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProdutorById = exports.getAllProdutores = void 0;
const produtorRuralService_1 = require("../services/produtorRuralService");
const produtorRuralService = new produtorRuralService_1.ProdutorRuralService();
const getAllProdutores = async (req, res) => {
    try {
        const produtores = await produtorRuralService.findAllProdutores();
        res.json(produtores);
    }
    catch (error) {
        res.status(500).json({ message: error?.message ?? 'An unexpected error occurred.' });
    }
};
exports.getAllProdutores = getAllProdutores;
const getProdutorById = async (req, res) => {
    try {
        const produtor = await produtorRuralService.findProdutorById(Number(req.params.id));
        if (!produtor) {
            res.status(404).json({ message: 'Produtor não encontrado' });
            return;
        }
        res.json(produtor);
    }
    catch (error) {
        res.status(500).json({ message: error?.message ?? 'An unexpected error occurred.' });
    }
};
exports.getProdutorById = getProdutorById;
