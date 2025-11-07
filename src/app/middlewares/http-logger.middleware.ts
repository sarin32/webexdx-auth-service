import { httpLogger } from '@webexdx/koa-wrap/middlewares';
import type { Context } from 'koa';
import logger from '../utils/logger';

const httpLoggerMiddleware = httpLogger({
  ignoreCB(ctx: Context) {
    return ctx.method === 'OPTIONS';
  },
  logger: logger.http,
});

export default httpLoggerMiddleware;
