import { Context, Next } from 'koa';
import { BaseError } from '../errors';
import HttpStatusCode from '../config/http-codes';

export async function errorMiddleware(ctx: Context, next: Next) {
  try {
    await next();
  } catch (error) {
    console.error(error);

    const body: Record<string, unknown> = {};
    if (error instanceof BaseError) {
      ctx.status = error.statusCode;
      body.message = error.message;
      if (error.errorCode) {
        body.errorCode = error.errorCode;
      }
    } else {
      ctx.status = HttpStatusCode.INTERNAL_SERVER_ERROR;
      body.message = 'Something went wrong';
    }
    ctx.body = body;
  }
}
