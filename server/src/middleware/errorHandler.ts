import { Context, Next } from 'koa';

import { logError } from '@/utils/logger';
import { HTTP_STATUS } from '@/utils/constants';

export const errorHandler = () => async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: any) {
    logError('[ERROR MIDDLEWARE]', `Internal server error ${err.debug}\n\n${err.stack}`);

    ctx.status = err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    ctx.body = {
      message: err.message,
    };
  }
};
