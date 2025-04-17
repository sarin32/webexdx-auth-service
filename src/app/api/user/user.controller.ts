import { Context } from 'koa';
import {
  emailSchema,
  objectSchema,
  stringSchema,
  validateObject,
} from '../../utils/schema-validator';
import { userService } from '../../services/user/user.service';
import { BadRequestError, ForbiddenError } from '../../errors';
import { userAuthService } from '../../services/user-auth/user-auth.service';
import { emailVerificationService } from '../../services/email-verification/email-verification.service';

const signUpSchema = objectSchema({
  object: {
    name: stringSchema({ min: 3, max: 20 }),
    email: emailSchema(),
    password: stringSchema({ min: 6, max: 30 }),
  },
});

const signInSchema = objectSchema({
  object: {
    email: emailSchema(),
    password: stringSchema({ min: 6, max: 30 }),
  },
});

const verifyEmailVerificationOTPSchema = objectSchema({
  object: {
    otp: stringSchema({ min: 6, max: 6 }),
  },
});

export async function signUp(ctx: Context) {
  const { error, value } = validateObject<{
    name: string;
    email: string;
    password: string;
  }>(signUpSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  const { name, email, password } = value;
  ctx.body = await userAuthService.signup({ name, email, password });
}

export async function signIn(ctx: Context) {
  const { error, value } = validateObject<{
    email: string;
    password: string;
  }>(signInSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  const { email, password } = value;
  ctx.body = await userAuthService.signIn({ email, password });
}

export async function sendEmailForVerification(ctx: Context) {
  const { userId } = ctx.state.user;

  if (
    !(await emailVerificationService.hasAccessToSendEmailVerificationEmail({
      userId,
    }))
  )
    throw new ForbiddenError(
      'You dont have the access to sent verification email'
    );

  ctx.body = await emailVerificationService.sendEmailForVerification({
    userId,
  });
}

export async function verifyEmailVerificationOTP(ctx: Context) {
  const { error, value } = validateObject<{
    otp: string;
  }>(verifyEmailVerificationOTPSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  const { userId } = ctx.state.user;

  if (
    !(await emailVerificationService.hasAccessToVerifyEmailVerificationOTP({
      userId,
    }))
  )
    throw new ForbiddenError(
      'You dont have the access to enter the verification OTP'
    );

  const { otp } = value;

  ctx.body = await emailVerificationService.verifyEmailVerificationOTP({
    userId,
    otp,
  });
}

export async function getSelfInfo(ctx: Context) {
  const { userId } = ctx.state.user;

  ctx.body = await userService.getUserInfo({ userId });
}
