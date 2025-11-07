// environment level constants
import * as dotEnv from 'dotenv';

dotEnv.config();

const env = process.env;

export const ALLOWED_ORIGINS = env.CLIENT_URL

export const PORT = Number(env.PORT);

export const NODE_ENV = env.NODE_ENV;

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

export const COOKIE_SETTINGS = {
  ACCESS_TOKEN_KEY: 'access_token',
  HTTP_ONLY: env.COOKIE_HTTP_ONLY === 'true',
  SECURE: env.COOKIE_SECURE === 'true',
  DOMAIN: env.COOKIE_DOMAIN,
  PATH: env.COOKIE_PATH,
  MAX_AGE: LOGIN_TOKEN_LIFETIME * 1000,
};
