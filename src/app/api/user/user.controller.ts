import { ForbiddenError } from '@webexdx/koa-wrap/errors';
import type { Context } from 'koa';
import { emailVerificationService } from '../../services/email-verification/email-verification.service';
import { userService } from '../../services/user/user.service';
import { userAuthService } from '../../services/user-auth/user-auth.service';
import { validateRequest } from '../../utils/schema-validator';
import { setTokenCookie } from '../../utils/token-util';
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

  const response = await userAuthService.signup({ name, email, password });
  setTokenCookie(ctx, response.token);
  ctx.body = response;
}

export async function signIn(ctx: Context) {
  const { email, password } = validateRequest<{
    email: string;
    password: string;
  }>(signInSchema, ctx.request.body);

  const response = await userAuthService.signIn({ email, password });
  setTokenCookie(ctx, response.token);
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

  const response = await emailVerificationService.verifyEmailVerificationOTP({
    userId,
    otp,
  });
  setTokenCookie(ctx, response.token);
  ctx.body = response;
}

export async function getSelfInfo(ctx: Context) {
  const { userId } = ctx.state.user;
  ctx.body = await userService.getUserInfo({ userId });
}
