import { Context } from 'koa';
import {
  signUpSchema,
  signInSchema,
  verifyEmailOTPSchema,
} from './user.schema';
import { validateRequest } from '../../utils/schema-validator';
import { userService } from '../../services/user/user.service';
import { ForbiddenError } from '@webexdx/koa-wrap/errors';
import { userAuthService } from '../../services/user-auth/user-auth.service';
import { emailVerificationService } from '../../services/email-verification/email-verification.service';

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

  ctx.body = await userAuthService.signIn({ email, password });
}

export async function sendEmailForVerification(ctx: Context) {
  const { userId } = ctx.state.user;

  if (
    !(await emailVerificationService.hasAccessToSendEmailVerificationEmail({
      userId,
    }))
  ) {
    throw new ForbiddenError(
      'You dont have the access to sent verification email'
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
      'You dont have the access to enter the verification OTP'
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
