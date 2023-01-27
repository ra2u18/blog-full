import Router from '@koa/router';

import { router as userRouter } from './user';

export const router = new Router();

router.use(userRouter.routes()).use(userRouter.allowedMethods());
