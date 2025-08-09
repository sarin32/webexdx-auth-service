import { authMiddleware as authMiddlewareGenerator } from '@webexdx/koa-wrap/middlewares';
import { SECRET_TOKEN } from '../config';
import { objectId } from '../utils/data-type-util';

export const authMiddleware = authMiddlewareGenerator({
  secret: SECRET_TOKEN,
  payloadTransform: ({ userId }) => {
    return {
      userId: objectId(userId),
    };
  },
});
