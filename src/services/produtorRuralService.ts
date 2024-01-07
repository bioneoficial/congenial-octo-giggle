import {ProdutorRural, ProdutorRuralPost} from '../models/produtorRuralModel';
import {ProdutorRuralRepository} from '../repositories/produtorRuralRepository';
import {FazendaService} from "./fazendaService";
import {CulturaService} from "./culturaService";
import {NextFunction} from "express";

export class ProdutorRuralService {
    private produtorRuralRepository: ProdutorRuralRepository;
    private fazendaService: FazendaService;
    private culturaService: CulturaService;

    constructor() {
        this.produtorRuralRepository = new ProdutorRuralRepository();
        this.fazendaService = new FazendaService();
        this.culturaService = new CulturaService();
    }

    public async findAllProdutores(): Promise<ProdutorRural[]> {
        return this.produtorRuralRepository.findAll();
    }

    public async findProdutorById(id: number): Promise<ProdutorRural | null> {
        return this.produtorRuralRepository.findById(id);
    }

    public async createProdutor(produtorData: ProdutorRuralPost): Promise<ProdutorRural | undefined> {
        try {
            this.validateCpfCnpj(produtorData.cpf_cnpj);

            if (await this.cpfCnpjExists(produtorData.cpf_cnpj)) {
                throw new Error('CPF/CNPJ already exists');
            }

            const produtorRural = await this.produtorRuralRepository.create({
                cpf_cnpj: produtorData.cpf_cnpj, nome: produtorData.nome
            });

            if (!produtorRural.id) {
                throw new Error('Failed to create produtor rural');
            }

            if (produtorData.areaAgricultavelHectares + produtorData.areaVegetacaoHectares > produtorData.areaTotalHectares) {
                throw new Error('The sum of cultivable and vegetation area cannot exceed the total farm area');
            }

            const fazenda = await this.fazendaService.createFazenda({
                nome: produtorData.nomeFazenda,
                cidade: produtorData.cidade,
                estado: produtorData.estado,
                areaTotalHectares: produtorData.areaTotalHectares,
                areaAgricultavelHectares: produtorData.areaAgricultavelHectares,
                areaVegetacaoHectares: produtorData.areaVegetacaoHectares,
                produtorId: produtorRural.id
            });

            for (const culturaId of produtorData.culturas) {
                await this.culturaService.linkFazendaToCultura(fazenda.id, culturaId);
            }
            return produtorRural;
        } catch (error) {
            throw error;
        }
    }

    public async updateProdutor(id: number, produtorData: ProdutorRural): Promise<ProdutorRural | null> {
        return this.produtorRuralRepository.update(id, produtorData);
    }

    public async deleteProdutor(id: number): Promise<void> {
        await this.produtorRuralRepository.delete(id);
    }

    private validateCpfCnpj(cpfCnpj: string): void {
        if (cpfCnpj.length !== 11 && cpfCnpj.length !== 14) {
            throw new Error('Invalid CPF/CNPJ length');
        }
        // Additional CPF/CNPJ format validations can be added here
    }

    private async cpfCnpjExists(cpfCnpj: string): Promise<boolean> {
        const produtor = await this.produtorRuralRepository.findByCpfCnpj(cpfCnpj);
        return !!produtor;
    }
}
