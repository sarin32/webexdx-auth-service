import { Transporter, SendMailOptions, createTransport } from 'nodemailer';
import { EMAIL_SETTINGS } from '../config/config';

// Define a custom type for email options
interface CustomMailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  senderName?: string;
}

class EmailUtils {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      service: EMAIL_SETTINGS.SERVICE_PROVIDER,
      auth: {
        user: EMAIL_SETTINGS.USER_ID,
        pass: EMAIL_SETTINGS.PASSWORD,
      },
    });
  }

  async sendEmail({
    to,
    subject,
    text,
    html,
    senderName,
  }: CustomMailOptions): Promise<string> {
    const mailOptions: SendMailOptions = {
      from: `${senderName} <${EMAIL_SETTINGS.USER_ID}>`,
      to,
      subject,
      text,
      html,
    };

    const response = await this.transporter.sendMail(mailOptions);
    return response;
  }
}

export default new EmailUtils();
