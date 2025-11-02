import { HTTPMethod, type Router } from '@webexdx/koa-wrap/server';
import { authMiddleware } from '../../middlewares/auth.middleware';
import {
  getSelfInfo,
  sendEmailForVerification,
  signIn,
  signUp,
  verifyEmailVerificationOTP,
} from './user.controller';

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
    middlewares: authMiddleware,
    handler: sendEmailForVerification,
  },
  {
    method: HTTPMethod.POST,
    path: '/verifyEmailVerificationOTP',
    middlewares: authMiddleware,
    handler: verifyEmailVerificationOTP,
  },
  {
    method: HTTPMethod.POST,
    path: '/getSelfInfo',
    middlewares: authMiddleware,
    handler: getSelfInfo,
  },
];

export default router;
