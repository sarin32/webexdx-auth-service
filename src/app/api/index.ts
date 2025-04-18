import { Router } from '@webexdx/koa-wrap';
import userRoute from './user/user.route';

const router: Router = [
  {
    path: '',
    children: userRoute,
  },
];
export default router;
