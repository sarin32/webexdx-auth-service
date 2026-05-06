import { httpLogger } from '@webexdx/koa-wrap/middlewares';
import type { Context } from 'koa';

const httpLoggerMiddleware = httpLogger({
  ignoreCB(ctx: Context) {
    return ctx.method === 'OPTIONS';
  },
});

export default httpLoggerMiddleware;
