import { bodyParser } from '@koa/bodyparser';
import cors from '@koa/cors';
import {
  errorMiddleware as errorMWGenerator,
  requestId,
} from '@webexdx/koa-wrap/middlewares';
import { Server } from '@webexdx/koa-wrap/server';
import router from '../api';
import { ALLOWED_ORIGINS, PORT } from '../config';
import { connection } from '../database';
import httpLoggerMiddleware from '../middlewares/http-logger.middleware';
import kafkaService from '../services/kafka-service';
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
const errorMiddleware = errorMWGenerator();
const requestIdMiddleware = requestId({ logger });

const server = new Server({
  port: PORT,
  routes: router,
  middlewares: [
    requestIdMiddleware,
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
    await kafkaService.connect();
    logger.info('ESTABLISHED KAFKA CONNECTION');
  },
});

export async function startServer() {
  await server.start();
}
