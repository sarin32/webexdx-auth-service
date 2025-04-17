import { Context, Next } from 'koa';
import { AuthorizationError, BadRequestError } from '../errors';
import { validateSignature } from '../utils/token-util';
import { objectId } from '../utils/data-type-util';

interface JwtPayload {
  userId: string;
  roleId: string; // Assuming roleId is also present in JwtPayload
}

export async function tokenMiddleware(ctx: Context, next: Next) {
  const authToken = ctx.get('Authorization');
  if (!authToken)
    throw new BadRequestError('Authorization header is not found');

  const token = authToken.split(' ').at(1);
  if (!token) throw new BadRequestError('Authorization header is invalid');

  const { invalidToken, payload, tokenExpired } =
    await validateSignature(token);

  if (tokenExpired) {
    throw new AuthorizationError('Authorization token expired');
  }

  if (invalidToken || !payload) {
    throw new AuthorizationError('Invalid Authorization token');
  }

  // Assert payload type to JwtPayload
  const { userId, roleId } = payload as JwtPayload;
  if (!userId || !roleId) {
    throw new AuthorizationError(
      'User ID or Role ID not found in token payload'
    );
  }

  ctx.state.user = {
    userId: objectId(userId),
    roleId: objectId(roleId),
  };

  return await next();
}
