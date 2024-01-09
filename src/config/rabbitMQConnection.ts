import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

export class RabbitMQConnection {
    private static instance: RabbitMQConnection;
    private conn: amqp.Connection | null = null;

    private constructor() {
    }

    public static async getInstance(): Promise<RabbitMQConnection> {
        if (!RabbitMQConnection.instance) {
            RabbitMQConnection.instance = new RabbitMQConnection();
            await RabbitMQConnection.instance.connect();
        }
        return RabbitMQConnection.instance;
    }

    public getConnection(): amqp.Connection {
        if (!this.conn) {
            throw new Error('RabbitMQ connection not established');
        }
        return this.conn;
    }

    private async connect(): Promise<void> {
        try {
            this.conn = await amqp.connect(String(process.env.RABBITMQ_URL));
            console.log('Connected to RabbitMQ');
        } catch (error) {
            console.error(`Error connecting to RabbitMQ: ${error}`);
            console.info(`Retrying in ${10000 / 1000} seconds...`);
            setTimeout(() => this.connect(), 10000);
        }
    }
}
