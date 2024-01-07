import Database from "../config/dbConfig";

export class FazendaRepository {
    private db: Database;

    constructor() {
        this.db = Database.getInstance();
    }

    public async create(fazenda: any): Promise<any> {
        const query = 'INSERT INTO fazendas (nome, cidade, estado, area_total_hectares, area_agricultavel_hectares, area_vegetacao_hectares, produtor_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [fazenda.nome, fazenda.cidade, fazenda.estado, fazenda.area_total_hectares, fazenda.area_agricultavel_hectares, fazenda.area_vegetacao_hectares, fazenda.produtor_id];
        const result = await this.db.executeQuery(query, values);
        return result[0];
    }
}
