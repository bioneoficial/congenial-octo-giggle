"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class Database {
    constructor() {
        this.pool = new pg_1.Pool({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
        });
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    async executeQuery(queryString, params = []) {
        try {
            const { rows } = await this.pool.query(queryString, params);
            return rows;
        }
        catch (error) {
            console.error('Database Error:', error);
            throw error;
        }
    }
}
exports.default = Database;
