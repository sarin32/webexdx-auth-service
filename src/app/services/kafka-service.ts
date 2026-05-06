import { Kafka, logLevel, type Producer } from 'kafkajs';
import { KAFKA_SETTINGS, NODE_ENV } from '../config/config';
import baseLogger from '../utils/logger';

const logger = baseLogger.child({ module: 'kafka-service' });

class KafkaService {
  private kafka: Kafka;
  private producer: Producer;
  private isConnected = false;

  constructor() {
    this.kafka = new Kafka({
      clientId: `auth-service-${NODE_ENV}`,
      brokers: KAFKA_SETTINGS.BROKERS,
      logCreator: () => {
        return ({ namespace, level, label, log }) => {
          const { message, ...extra } = log;
          const winstonLevel = this.toWinstonLogLevel(level);
          logger[winstonLevel](`${label} [${namespace}] ${message}`, extra);
        };
      },
    });
    this.producer = this.kafka.producer();
  }

  private toWinstonLogLevel(level: logLevel) {
    switch (level) {
      case logLevel.ERROR:
      case logLevel.NOTHING:
        return 'error';
      case logLevel.WARN:
        return 'warn';
      case logLevel.INFO:
        return 'info';
      case logLevel.DEBUG:
        return 'debug';
      default:
        return 'info';
    }
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
      logger.info(`Message produced to topic ${topic}`);
    } catch (error) {
      logger.error(`Error producing message to topic ${topic}:`, error);
      throw error;
    }
  }

  async disconnect() {
    if (this.isConnected) {
      await this.producer.disconnect();
      this.isConnected = false;
      logger.info('Kafka Producer disconnected');
    }
  }
}

export default new KafkaService();
