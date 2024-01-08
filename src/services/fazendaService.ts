import { FazendaRepository } from '../repositories/fazendaRepository';
import {IFazenda } from '../models/produtorRuralModel';

export class FazendaService {
    private fazendaRepository: FazendaRepository;

    constructor() {
        this.fazendaRepository = new FazendaRepository();
    }

    public async createFazenda(fazendaData: IFazenda): Promise<any> {

        return this.fazendaRepository.create({
            nome: fazendaData.nome,
            cidade: fazendaData.cidade,
            estado: fazendaData.estado,
            area_total_hectares: fazendaData.areaTotalHectares,
            area_agricultavel_hectares: fazendaData.areaAgricultavelHectares,
            area_vegetacao_hectares: fazendaData.areaVegetacaoHectares,
            produtor_id: fazendaData.produtorId
        });
    }

    public async deleteByProdutorId(produtorId: number): Promise<void> {
        return this.fazendaRepository.deleteByProdutorId(produtorId);
    }
}
