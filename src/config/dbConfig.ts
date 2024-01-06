import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

class Database {
    private static instance: Database;
    private pool: Pool;

    private constructor() {
        this.pool = new Pool({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
        });
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async executeQuery(queryString: string, params: any[] = []): Promise<any> {
        const client = await this.pool.connect();
        try {
            const { rows } = await client.query(queryString, params);
            return rows;
        } catch (error) {
            console.error('Database Error:', error);
            throw error;
        } finally {
            client.release();
        }
    }
}

export default Database;
