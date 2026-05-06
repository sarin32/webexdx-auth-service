// environment level constants
import type { LoggerSettings } from '@webexdx/koa-wrap/logger';
import * as dotEnv from 'dotenv';

dotEnv.config();

const env = process.env;

export const ALLOWED_ORIGINS = (env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export const PORT = Number(env.PORT);

export enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export const NODE_ENV = (env.NODE_ENV as NodeEnv) || NodeEnv.DEVELOPMENT;

export const DATABASE_SETTINGS = {
  URL: env.DATABASE_URL!,
};

export const SECRET_TOKEN = env.JWT_SECRET_TOKEN!;
export const LOGIN_TOKEN_LIFETIME = 6000;

export const EMAIL_SETTINGS = {
  SERVICE_PROVIDER: 'gmail',
  USER_ID: env.EMAIL_USER_ID,
  PASSWORD: env.EMAIL_PASSWORD,
};

export const KAFKA_SETTINGS = {
  BROKERS: (env.KAFKA_BROKERS || 'localhost:9092').split(','),
  EMAIL_TOPIC: env.KAFKA_EMAIL_TOPIC || 'email-commands',
};

export const COOKIE_SETTINGS = {
  ACCESS_TOKEN_KEY: 'access_token',
  HTTP_ONLY: env.COOKIE_HTTP_ONLY === 'true',
  SECURE: env.COOKIE_SECURE === 'true',
  DOMAIN: env.COOKIE_DOMAIN,
  PATH: env.COOKIE_PATH,
  MAX_AGE: LOGIN_TOKEN_LIFETIME * 1000,
};

export const LOG_SETTINGS: LoggerSettings = {
  print: {
    colorize: NODE_ENV === NodeEnv.DEVELOPMENT,
    level: env.PRINT_LOG_LEVEL || 'debug',
  },
  file: {
    logToFile: NODE_ENV === NodeEnv.DEVELOPMENT,
    level: env.FILE_LOG_LEVEL || 'debug',
  },
};
