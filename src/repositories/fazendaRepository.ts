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

    public async deleteByProdutorId(produtorId: number): Promise<void> {
        const query = 'UPDATE fazendas SET deleted_at = NOW() WHERE produtor_id = $1;';
        await this.db.executeQuery(query, [produtorId]);
    }

    public async update(fazendaId: number, fazendaData: { [key: string]: any }): Promise<void> {
        const entries = Object.entries(fazendaData);
        const updates = entries.map(([column, value], index) => `"${column}" = $${index + 1}`).join(', ');
        const values = entries.map(([, value]) => value);

        const query = `UPDATE fazendas
                       SET ${updates}
                       WHERE id = ${fazendaId}`;

        await this.db.executeQuery(query, values);
    }

    public async getGraphicData(): Promise<{ fazendaCount: number, totalArea: number, totalAgricutavel: number, totalVegetavel: number }> {
        const query = `SELECT COUNT(*) as fazendacount, SUM(area_total_hectares) as totalarea, 
                     SUM(area_agricultavel_hectares) as totalagricutavel, 
                     SUM(area_vegetacao_hectares) as totalvegetavel 
                     FROM fazendas`;
        const rows = await this.db.executeQuery(query);
        return {
            fazendaCount: Number(rows[0].fazendacount),
            totalArea: Number(rows[0].totalarea),
            totalAgricutavel: Number(rows[0].totalagricutavel),
            totalVegetavel: Number(rows[0].totalvegetavel)
        };
    }

    public async getFazendaCountByEstado(): Promise<{estado: string, count: number}[]> {
        const result = await this.db.executeQuery('SELECT estado, COUNT(*) as count FROM fazendas GROUP BY estado');
        return result.map((item: { estado: any; count: any; }) => ({estado: item.estado, count: Number(item.count)}));
    }
}
