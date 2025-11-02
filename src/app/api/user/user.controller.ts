import { ForbiddenError } from '@webexdx/koa-wrap/errors';
import type { Context } from 'koa';
import { COOKIE_SETTINGS } from '../../config';
import { emailVerificationService } from '../../services/email-verification/email-verification.service';
import { userService } from '../../services/user/user.service';
import { userAuthService } from '../../services/user-auth/user-auth.service';
import { validateRequest } from '../../utils/schema-validator';
import {
  signInSchema,
  signUpSchema,
  verifyEmailOTPSchema,
} from './user.schema';

export async function signUp(ctx: Context) {
  const { name, email, password } = validateRequest<{
    name: string;
    email: string;
    password: string;
  }>(signUpSchema, ctx.request.body);

  ctx.body = await userAuthService.signup({ name, email, password });
}

export async function signIn(ctx: Context) {
  const { email, password } = validateRequest<{
    email: string;
    password: string;
  }>(signInSchema, ctx.request.body);

  const response = await userAuthService.signIn({ email, password });
  ctx.cookies.set('access_token', response.token, {
    httpOnly: COOKIE_SETTINGS.HTTP_ONLY,
    secure: COOKIE_SETTINGS.SECURE,
    domain: COOKIE_SETTINGS.DOMAIN,
    path: COOKIE_SETTINGS.PATH,
  });
  ctx.body = response;
}

export async function sendEmailForVerification(ctx: Context) {
  const { userId } = ctx.state.user;

  if (
    !(await emailVerificationService.hasAccessToSendEmailVerificationEmail({
      userId,
    }))
  ) {
    throw new ForbiddenError(
      'You dont have the access to sent verification email',
    );
  }

  ctx.body = await emailVerificationService.sendEmailForVerification({
    userId,
  });
}

export async function verifyEmailVerificationOTP(ctx: Context) {
  const { otp } = validateRequest<{
    otp: string;
  }>(verifyEmailOTPSchema, ctx.request.body);

  const { userId } = ctx.state.user;

  if (
    !(await emailVerificationService.hasAccessToVerifyEmailVerificationOTP({
      userId,
    }))
  ) {
    throw new ForbiddenError(
      'You dont have the access to enter the verification OTP',
    );
  }

  ctx.body = await emailVerificationService.verifyEmailVerificationOTP({
    userId,
    otp,
  });
}

export async function getSelfInfo(ctx: Context) {
  const { userId } = ctx.state.user;
  ctx.body = await userService.getUserInfo({ userId });
}
