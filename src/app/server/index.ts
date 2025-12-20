import { bodyParser } from '@koa/bodyparser';
import cors from '@koa/cors';
import { Server } from '@webexdx/koa-wrap/server';
import router from '../api';
import { ALLOWED_ORIGINS, PORT } from '../config';
import { connection } from '../database';

import errorMiddleware from '../middlewares/error.middleware';
import httpLoggerMiddleware from '../middlewares/http-logger.middleware';
import logger from '../utils/logger';

const corsMiddleware = cors({
  credentials: true,
  origin: (ctx) => {
    const origin = ctx.get('Origin');
    return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
});
const bodyparserMiddleware = bodyParser();

const server = new Server({
  port: PORT,
  routes: router,
  middlewares: [
    httpLoggerMiddleware,
    corsMiddleware,
    bodyparserMiddleware,
    errorMiddleware,
  ],
  onStartCb: () => {
    logger.info(`APP IS RUNNING ON PORT ${PORT}`);
  },
  preStartCb: async () => {
    await connection.startConnecion();
    logger.info('ESTABLISHED DATABASE CONNECTION');
  },
});

export async function startServer() {
  await server.start();
}
