// environment level constants

import { Binary } from 'mongodb';
import * as dotEnv from 'dotenv';

dotEnv.config();

const env = process.env;

export const PORT = Number(env.PORT!);

export const NODE_ENV = env.NODE_ENV;

export const DATABASE_SETTINGS = {
  URL: env.DATABASE_URL!,
  MASTER_KEY: Buffer.from(env.DATABASE_MASTER_KEY!, 'hex')!,
  KEY_BASE64: [
    new Binary(Buffer.from(env.DATABASE_ENCRYPTION_KEY_BASE64!, 'base64'), 4),
  ],
};

export const SECRET_TOKEN = env.JWT_SECRET_TOKEN!;
export const LOGIN_TOKEN_LIFETIME = 6000;

export const EMAIL_SETTINGS = {
  SERVICE_PROVIDER: 'gmail',
  USER_ID: env.EMAIL_USER_ID,
  PASSWORD: env.EMAIL_PASSWORD,
};
