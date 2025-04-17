import {
  getSelfInfo,
  sendEmailForVerification,
  signIn,
  signUp,
  verifyEmailVerificationOTP,
} from './user.controller';
import { tokenMiddleware } from '../../middlewares';
import { Router } from '@webexdx/koa-wrap';
import { HTTPMethod } from '@webexdx/koa-wrap/build/src/router/interface';

const router: Router = [
  {
    method: HTTPMethod.POST,
    path: '/signup',
    handler: signUp,
  },
  {
    method: HTTPMethod.POST,
    path: '/signin',
    handler: signIn,
  },
  {
    method: HTTPMethod.POST,
    path: '/sendEmailForVerification',
    middlewares: tokenMiddleware,
    handler: sendEmailForVerification,
  },
  {
    method: HTTPMethod.POST,
    path: '/verifyEmailVerificationOTP',
    middlewares: tokenMiddleware,
    handler: verifyEmailVerificationOTP,
  },
  {
    method: HTTPMethod.POST,
    path: '/getSelfInfo',
    middlewares: tokenMiddleware,
    handler: getSelfInfo,
  },
];

export default router;
