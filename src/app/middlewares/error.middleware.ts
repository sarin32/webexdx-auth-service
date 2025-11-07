import { errorMiddleware as errorMWGenerator } from '@webexdx/koa-wrap/middlewares';
import type { Context } from 'koa';
import logger from '../utils/logger';

const errorMiddleware = errorMWGenerator({
  logger: (_: Context, err: unknown) => {
    logger.error('', err);
  },
});

export default errorMiddleware;
