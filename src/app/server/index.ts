import { bodyParser } from '@koa/bodyparser';
import cors from '@koa/cors';
import { errorMiddleware } from '@webexdx/koa-wrap/middlewares';
import { Server } from '@webexdx/koa-wrap/server';
import logger from 'koa-logger';
import router from '../api';
import { PORT } from '../config/config';
import { connection } from '../database';

const loggerMiddleware = logger();
const corsMiddleware = cors({
  allowMethods: ['GET', 'POST'],
});
const bodyparserMiddleware = bodyParser();

const server = new Server({
  port: PORT,
  routes: router,
  middlewares: [
    loggerMiddleware,
    corsMiddleware,
    bodyparserMiddleware,
    errorMiddleware,
  ],
  onStartCb: () => {
    console.log('APP IS RUNNING ON PORT ', PORT);
  },
  preStartCb: async () => {
    await connection.startConnecion();
    console.log('ESTABLISHED DATABASE CONNECTION');
  },
});

export async function startServer() {
  await server.start();
}
