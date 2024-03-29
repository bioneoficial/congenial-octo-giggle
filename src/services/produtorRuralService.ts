import {IProdutorRural, IGetProdutorRural, IProdutorRuralPost, IProdutorRuralPut} from '../models/produtorRuralModel';
import {ProdutorRuralRepository} from '../repositories/produtorRuralRepository';
import {FazendaService} from "./fazendaService";
import {CulturaService} from "./culturaService";
import {CustomError} from "../errors/customError";
import {QueueService} from "./queueService";

export class ProdutorRuralService {
    produtorRuralRepository: ProdutorRuralRepository;
    fazendaService: FazendaService;
    culturaService: CulturaService;
    queueService: QueueService;

    constructor() {
        this.produtorRuralRepository = new ProdutorRuralRepository();
        this.fazendaService = new FazendaService();
        this.culturaService = new CulturaService();
        this.queueService = new QueueService();
        if (process.env.NODE_ENV !== 'test') {
            this.queueService.init().then(() => {
                console.log('QueueService initialized');
            }).catch(err => {
                console.error('Failed to initialize QueueService:', err);
            });
        }
    }

    public async findAllProdutores(): Promise<IGetProdutorRural[]> {
        return this.produtorRuralRepository.findAll();
    }

    public async findProdutorById(id: number): Promise<IGetProdutorRural | null> {
        return this.produtorRuralRepository.findById(id);
    }

    public async createProdutor(produtorData: IProdutorRuralPost): Promise<IProdutorRural | undefined> {
        try {
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

            const message = {
                fazendaId: fazenda.id,
                culturaIds: produtorData.culturas
            };
            await this.queueService.sendMessage("CulturaLinkingQueue", JSON.stringify(message));

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

    public async updateProdutor(produtorData: IProdutorRuralPut): Promise<IGetProdutorRural | null> {
        const produtorRural = await this.produtorRuralRepository.update(produtorData.produtorId, {
            cpf_cnpj: produtorData.cpf_cnpj,
            nome: produtorData.nome
        });

        const fazenda = await this.fazendaService.updateFazenda(produtorData.fazendaId, {
            nome: produtorData.nomeFazenda,
            cidade: produtorData.cidade,
            estado: produtorData.estado,
            area_total_hectares: produtorData.areaTotalHectares,
            area_agricultavel_hectares: produtorData.areaAgricultavelHectares,
            area_vegetacao_hectares: produtorData.areaVegetacaoHectares
        });

        await this.culturaService.updateFazendaCulturas(produtorData.fazendaId, produtorData.culturas);

        return this.produtorRuralRepository.findById(produtorData.produtorId);
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
        // Here i would implement cpf-cnpj-validator or external API but i won't do that now because i'm with no time.
    }

    private async cpfCnpjExists(cpfCnpj: string): Promise<boolean> {
        const produtor = await this.produtorRuralRepository.findByCpfCnpj(cpfCnpj);
        return !!produtor;
    }
}
