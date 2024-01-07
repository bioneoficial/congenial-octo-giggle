import { FazendaRepository } from '../repositories/fazendaRepository';
import {Fazenda } from '../models/produtorRuralModel';

export class FazendaService {
    private fazendaRepository: FazendaRepository;

    constructor() {
        this.fazendaRepository = new FazendaRepository();
    }

    public async createFazenda(fazendaData: Fazenda): Promise<any> {
        if (fazendaData.areaTotalHectares < fazendaData.areaAgricultavelHectares + fazendaData.areaVegetacaoHectares) {
            throw new Error('Total area cannot be less than the sum of agricultable and vegetation areas');
        }
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
}
