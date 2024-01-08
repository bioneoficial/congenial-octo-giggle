import {IGetProdutorRural, IProdutorRural} from '../models/produtorRuralModel';
import Database from '../config/dbConfig';
import {ResourceNotFoundError} from "../errors/resourceNotFoundError";

export class ProdutorRuralRepository {
    private db: Database;

    constructor() {
        this.db = Database.getInstance();
    }

    public async findAll(): Promise<IGetProdutorRural[]> {
        const query = `
            SELECT pr.id,
                   pr.cpf_cnpj,
                   pr.nome,
                   pr.created_at,
                   pr.updated_at,
                   faz.id                         AS idFazenda,
                   faz.nome                       AS nomeFazenda,
                   faz.cidade,
                   faz.estado,
                   faz.area_total_hectares        AS areaTotalHectares,
                   faz.area_agricultavel_hectares AS areaAgricultavelHectares,
                   faz.area_vegetacao_hectares    AS areaVegetacaoHectares,
                   ARRAY_AGG(cf.cultura_id)       AS culturas
            FROM produtores_rurais AS pr
                     LEFT JOIN fazendas AS faz ON pr.id = faz.produtor_id
                     LEFT JOIN culturas_fazenda AS cf ON faz.id = cf.fazenda_id
            WHERE pr.deleted_at IS NULL
            GROUP BY pr.id, faz.id
        `;
        const rows = await this.db.executeQuery(query);
        return rows as IGetProdutorRural[];
    }

    public async findById(id: number): Promise<IGetProdutorRural | null> {
        const query = `
            SELECT pr.id,
                   pr.cpf_cnpj,
                   pr.nome,
                   pr.created_at,
                   pr.updated_at,
                   faz.id                         AS idFazenda,
                   faz.nome                       AS nomeFazenda,
                   faz.cidade,
                   faz.estado,
                   faz.area_total_hectares        AS areaTotalHectares,
                   faz.area_agricultavel_hectares AS areaAgricultavelHectares,
                   faz.area_vegetacao_hectares    AS areaVegetacaoHectares,
                   ARRAY_AGG(cf.cultura_id)       AS culturas
            FROM produtores_rurais AS pr
                     LEFT JOIN fazendas AS faz ON pr.id = faz.produtor_id
                     LEFT JOIN culturas_fazenda AS cf ON faz.id = cf.fazenda_id
            WHERE pr.deleted_at IS NULL
              AND pr.id = $1
            GROUP BY pr.id, faz.id
        `;
        const rows = await this.db.executeQuery(query, [id]);
        if (rows.length === 0) {
            throw new ResourceNotFoundError(`ProdutorRural with id ${id} not found`);
        }
        return rows[0] as IGetProdutorRural;
    }

    public async create(produtor: IProdutorRural): Promise<IProdutorRural> {
        const query = 'INSERT INTO produtores_rurais (cpf_cnpj, nome) VALUES ($1, $2) RETURNING *;';
        const values = [produtor.cpf_cnpj, produtor.nome];
        const rows = await this.db.executeQuery(query, values);
        return rows[0] as IProdutorRural;
    }

    public async update(id: number, produtorData: IProdutorRural): Promise<IProdutorRural | null> {
        const query = 'UPDATE produtores_rurais SET cpf_cnpj = $1, nome = $2 WHERE id = $3 RETURNING *;';
        const values = [produtorData.cpf_cnpj, produtorData.nome, id];
        const rows = await this.db.executeQuery(query, values);
        if (rows.length === 0) return null;
        return rows[0] as IProdutorRural;
    }

    public async delete(id: number): Promise<void> {
        const query = 'UPDATE produtores_rurais SET deleted_at = NOW() WHERE id = $1;';
        await this.db.executeQuery(query, [id]);
    }

    public async findByCpfCnpj(cpfCnpj: string): Promise<IProdutorRural | null> {
        const query = 'SELECT * FROM produtores_rurais WHERE cpf_cnpj = $1';

        try {
            const result = await this.db.executeQuery(query, [cpfCnpj]);
            if (result && result.rows && result.rows.length > 0) {
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
