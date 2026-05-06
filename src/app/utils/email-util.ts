import { KAFKA_SETTINGS } from '../config/config';
import kafkaService from '../services/kafka-service';

// Define a custom type for email options
interface CustomMailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  senderName?: string;
}

class EmailUtils {
  async sendEmail({
    to,
    subject,
    text,
    html,
    senderName,
  }: CustomMailOptions): Promise<void> {
    const payload = {
      to,
      subject,
      text,
      html,
      sender_name: senderName, // Map senderName to sender_name as expected by the email service
    };

    await kafkaService.produce(KAFKA_SETTINGS.EMAIL_TOPIC, payload);
  }
}

export default new EmailUtils();
