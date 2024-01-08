import Database from "../config/dbConfig";
import {ResourceNotFoundError} from "../errors/resourceNotFoundError";

export class CulturaRepository {
    private db: Database;

    constructor() {
        this.db = Database.getInstance();
    }

    public async findById(culturaId: number): Promise<any> {
        const query = 'SELECT * FROM culturas WHERE id = $1';
        const result = await this.db.executeQuery(query, [culturaId]);
        if (!result || result.length === 0) {
            throw new ResourceNotFoundError(`Cultura with id ${culturaId} not found`);
        }

        return result[0];
    }

    public async linkToFazenda(fazendaId: number, culturaId: number): Promise<void> {
        const query = 'INSERT INTO culturas_fazenda (fazenda_id, cultura_id) VALUES ($1, $2)';
        await this.db.executeQuery(query, [fazendaId, culturaId]);
    }

    public async removeByFazendaId(fazendaId: number): Promise<void> {
        const query = 'DELETE FROM culturas_fazenda WHERE fazenda_id = $1;';
        await this.db.executeQuery(query, [fazendaId]);
    }
}
