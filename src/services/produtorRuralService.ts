import {IProdutorRural, IGetProdutorRural, IProdutorRuralPost} from '../models/produtorRuralModel';
import {ProdutorRuralRepository} from '../repositories/produtorRuralRepository';
import {FazendaService} from "./fazendaService";
import {CulturaService} from "./culturaService";
import {CustomError} from "../errors/customError";

export class ProdutorRuralService {
    private produtorRuralRepository: ProdutorRuralRepository;
    private fazendaService: FazendaService;
    private culturaService: CulturaService;

    constructor() {
        this.produtorRuralRepository = new ProdutorRuralRepository();
        this.fazendaService = new FazendaService();
        this.culturaService = new CulturaService();
    }

    public async findAllProdutores(): Promise<IGetProdutorRural[]> {
        return this.produtorRuralRepository.findAll();
    }

    public async findProdutorById(id: number): Promise<IGetProdutorRural | null> {
        return this.produtorRuralRepository.findById(id);
    }

    public async createProdutor(produtorData: IProdutorRuralPost): Promise<IProdutorRural | undefined> {
        try {
            console.log(produtorData)
             await this.validateCreateProdutorData(produtorData);

            const produtorRural = await this.produtorRuralRepository.create({
                cpf_cnpj: produtorData.cpf_cnpj, nome: produtorData.nome
            });

            if (!produtorRural.id) {
                throw new CustomError('Failed to create produtor rural', 400);
            }


            const fazenda = await this.fazendaService.createFazenda({
                ...produtorData,
                nome: produtorData.nomeFazenda,
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

    private async validateCreateProdutorData(produtorData: IProdutorRuralPost): Promise<void> {
        this.validateCpfCnpj(produtorData.cpf_cnpj);

            if (await this.cpfCnpjExists(produtorData.cpf_cnpj)) {
                throw new CustomError('CPF/CNPJ already exists', 400);
            }

            if (produtorData.areaAgricultavelHectares + produtorData.areaVegetacaoHectares > produtorData.areaTotalHectares) {
                throw new CustomError('The sum of cultivable and vegetation area cannot exceed the total farm area', 400);
            }
    }

    public async updateProdutor(id: number, produtorData: IProdutorRural): Promise<IProdutorRural | null> {
        return this.produtorRuralRepository.update(id, produtorData);
    }

    public async deleteProdutor(id: number): Promise<void> {
        await this.fazendaService.deleteByProdutorId(id);
        await this.produtorRuralRepository.delete(id);
    }

    private validateCpfCnpj(cpfCnpj: string): void {
        try {
            if (cpfCnpj.length !== 11 && cpfCnpj.length !== 14) {
                throw new CustomError('Invalid CPF/CNPJ length', 400);
            }
        } catch (error) {
            throw error;
        }
    }

    private async cpfCnpjExists(cpfCnpj: string): Promise<boolean> {
        const produtor = await this.produtorRuralRepository.findByCpfCnpj(cpfCnpj);
        return !!produtor;
    }
}
