import z from 'zod';
import { Context } from 'koa';
import Router from '@koa/router';

import { validate } from '@/utils/zod';

export const router = new Router();

const userISchema = z.object({
  firstName: z.string({ required_error: 'firstname is required' }),
});

const userIQSchema = z.object({
  lastName: z.string({ required_error: 'lastName is required' }),
});

router.post(
  '/users',
  // validate([
  //   { schema: userIQSchema, reqProperty: 'query' },
  //   { schema: userISchema, reqProperty: 'body' },
  // ]),
  async (ctx: Context) => {
    ctx.status = 200;
    ctx.body = { user: 'alin' };
  }
);
