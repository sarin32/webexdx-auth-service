import { bodyParser } from '@koa/bodyparser';
import cors from '@koa/cors';
import { PORT } from '../config/config';
import { errorMiddleware } from '@webexdx/koa-wrap/middlewares';
import { connection } from '../database';
import logger from 'koa-logger';
import { Server } from '@webexdx/koa-wrap/server';
import router from '../api';
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
