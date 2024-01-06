import { ProdutorRural } from '../models/produtorRuralModel';
import { ProdutorRuralRepository } from '../repositories/produtorRuralRepository';

export class ProdutorRuralService {
    private produtorRuralRepository: ProdutorRuralRepository;

    constructor() {
        this.produtorRuralRepository = new ProdutorRuralRepository();
    }

    public async findAllProdutores(): Promise<ProdutorRural[]> {
        return this.produtorRuralRepository.findAll();
    }

    public async findProdutorById(id: number): Promise<ProdutorRural | null> {
        return this.produtorRuralRepository.findById(id);
    }

    public async createProdutor(produtor: ProdutorRural): Promise<ProdutorRural> {
        return this.produtorRuralRepository.create(produtor);
    }

    public async updateProdutor(id: number, produtorData: ProdutorRural): Promise<ProdutorRural | null> {
        return this.produtorRuralRepository.update(id, produtorData);
    }

    public async deleteProdutor(id: number): Promise<void> {
        await this.produtorRuralRepository.delete(id);
    }
}
