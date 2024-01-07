import Database from "../config/dbConfig";

export class CulturaRepository {
    private db: Database;

    constructor() {
        this.db = Database.getInstance();
    }

    public async findById(culturaId: number): Promise<any> {
        const query = 'SELECT * FROM culturas WHERE id = $1';
        const result = await this.db.executeQuery(query, [culturaId]);
        return result.rows[0];
    }

    public async linkToFazenda(fazendaId: number, culturaId: number): Promise<void> {
        const query = 'INSERT INTO culturas_fazenda (fazenda_id, cultura_id) VALUES ($1, $2)';
        await this.db.executeQuery(query, [fazendaId, culturaId]);
    }
}