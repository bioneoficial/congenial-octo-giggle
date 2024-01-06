import { RabbitMQConnection } from '../config/rabbitMQConnection';

export class QueueService {
    private connection: RabbitMQConnection | null = null;

    public async init(): Promise<void> {
        this.connection = await RabbitMQConnection.getInstance();
    }

    public async sendMessage(queue: string, message: string): Promise<void> {
        if (!this.connection) {
            throw new Error('QueueService is not initialized');
        }
        const conn = this.connection.getConnection();
        const channel = await conn.createChannel();

        await channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Sent message to ${queue}: ${message}`);
    }

}
