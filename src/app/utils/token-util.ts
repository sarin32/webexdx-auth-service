import * as jwt from 'jsonwebtoken';
import type { Context } from 'koa';
import { COOKIE_SETTINGS, SECRET_TOKEN } from '../config/config';

export async function generateSignature(
  payload: object,
  expiresIn: number,
): Promise<string> {
  return await jwt.sign(payload as object, SECRET_TOKEN, { expiresIn });
}

export async function validateSignature(token: string) {
  try {
    const payload = await jwt.verify(token, SECRET_TOKEN);
    return { payload };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { tokenExpired: true };
    } else if (error instanceof jwt.JsonWebTokenError) {
      return { invalidToken: true };
    }
    throw error;
  }
}

export async function setTokenCookie(
  ctx: Context,
  accessToken: string,
): Promise<void> {
  ctx.cookies.set(COOKIE_SETTINGS.ACCESS_TOKEN_KEY, accessToken, {
    httpOnly: COOKIE_SETTINGS.HTTP_ONLY,
    secure: COOKIE_SETTINGS.SECURE,
    domain: COOKIE_SETTINGS.DOMAIN,
    path: COOKIE_SETTINGS.PATH,
    maxAge: COOKIE_SETTINGS.MAX_AGE, // 7 days
  });
}

export async function resetCookie(ctx: Context): Promise<void> {
  ctx.cookies.set(COOKIE_SETTINGS.ACCESS_TOKEN_KEY, '', {
    httpOnly: COOKIE_SETTINGS.HTTP_ONLY,
    secure: COOKIE_SETTINGS.SECURE,
    domain: COOKIE_SETTINGS.DOMAIN,
    path: COOKIE_SETTINGS.PATH,
    maxAge: 0,
  });
}
