import {ProdutorRural} from '../models/produtorRuralModel';
import Database from '../config/dbConfig';

export class ProdutorRuralRepository {
    private db: Database;

    constructor() {
        this.db = Database.getInstance();
    }

    public async findAll(): Promise<ProdutorRural[]> {
        const query = 'SELECT * FROM produtores_rurais;';
        const rows = await this.db.executeQuery(query);
        return rows as ProdutorRural[];
    }

    public async findById(id: number): Promise<ProdutorRural | null> {
        const query = 'SELECT * FROM produtores_rurais WHERE id = $1;';
        const rows = await this.db.executeQuery(query, [id]);
        if (rows.length === 0) return null;
        return rows[0] as ProdutorRural;
    }

    public async create(produtor: ProdutorRural): Promise<ProdutorRural> {
        const query = 'INSERT INTO produtores_rurais (cpf_cnpj, nome) VALUES ($1, $2) RETURNING *;';
        const values = [produtor.cpf_cnpj, produtor.nome];
        const rows = await this.db.executeQuery(query, values);
        return rows[0] as ProdutorRural;
    }

    public async update(id: number, produtorData: ProdutorRural): Promise<ProdutorRural | null> {
        const query = 'UPDATE produtores_rurais SET cpf_cnpj = $1, nome = $2 WHERE id = $3 RETURNING *;';
        const values = [produtorData.cpf_cnpj, produtorData.nome, id];
        const rows = await this.db.executeQuery(query, values);
        if (rows.length === 0) return null;
        return rows[0] as ProdutorRural;
    }

    public async delete(id: number): Promise<void> {
        const query = 'DELETE FROM produtores_rurais WHERE id = $1;';
        await this.db.executeQuery(query, [id]);
    }

    public async findByCpfCnpj(cpfCnpj: string): Promise<ProdutorRural | null> {
        const query = 'SELECT * FROM produtores_rurais WHERE cpf_cnpj = $1';

        try {
            const result = await this.db.executeQuery(query, [cpfCnpj]);
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error in findByCpfCnpj:', error);
            throw new Error('Error accessing the database');
        }
    }
}
