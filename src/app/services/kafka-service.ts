import { Kafka, type Producer } from 'kafkajs';
import { KAFKA_SETTINGS, NODE_ENV } from '../config/config';
import logger from '../utils/logger';

class KafkaService {
  private kafka: Kafka;
  private producer: Producer;
  private isConnected = false;

  constructor() {
    this.kafka = new Kafka({
      clientId: `auth-service-${NODE_ENV}`,
      brokers: KAFKA_SETTINGS.BROKERS,
    });
    this.producer = this.kafka.producer();
  }

  async connect() {
    if (!this.isConnected) {
      await this.producer.connect();
      this.isConnected = true;
      logger.info('Kafka Producer connected');
    }
  }

  async produce(topic: string, message: any) {
    try {
      await this.connect();
      await this.producer.send({
        topic,
        messages: [
          {
            value: JSON.stringify(message),
          },
        ],
      });
      console.log(`Message produced to topic ${topic}`);
    } catch (error) {
      console.error(`Error producing message to topic ${topic}:`, error);
      throw error;
    }
  }

  async disconnect() {
    if (this.isConnected) {
      await this.producer.disconnect();
      this.isConnected = false;
      console.log('Kafka Producer disconnected');
    }
  }
}

export default new KafkaService();
