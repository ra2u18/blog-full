import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { router } from './api/routes';

import { errorHandler } from './middleware/errorHandler';
import { responseTime } from './middleware/responseTime';

export const app = new Koa();

app
  .use(errorHandler())
  .use(bodyParser())
  .use(responseTime())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());
