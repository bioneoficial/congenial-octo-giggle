import { CulturaRepository } from '../repositories/culturaRepository';

export class CulturaService {
    private culturaRepository: CulturaRepository;

    constructor() {
        this.culturaRepository = new CulturaRepository();
    }

    public async linkFazendaToCultura(fazendaId: number, culturaId: number): Promise<void> {
        const cultura = await this.culturaRepository.findById(culturaId);
        if (!cultura) {
            throw new Error('Cultura not found');
        }

        await this.culturaRepository.linkToFazenda(fazendaId, culturaId);
    }

    public async updateFazendaCulturas(fazendaId: number, culturas: number[]): Promise<void> {
        await this.culturaRepository.removeByFazendaId(fazendaId);

        for (const culturaId of culturas) {
            await this.linkFazendaToCultura(fazendaId, culturaId);
        }
    }

    public async getFazendaCountByCultura(): Promise<any[]> {
        return await this.culturaRepository.getFazendaCountByCultura();
    }
}
