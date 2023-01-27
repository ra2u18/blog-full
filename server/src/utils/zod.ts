import { Context, Next } from 'koa';
import z from 'zod';

import { HTTP_STATUS } from './constants';
import { logError } from './logger';

type ReqProperty = 'body' | 'params' | 'query';

interface IValidation {
  schema: z.ZodSchema;
  reqProperty: ReqProperty;
}

interface IValidationError {
  error: z.ZodError;
  reqProperty: ReqProperty;
}

/**
 * This function maps the IValidationeErrors to a pretty printed message array
 * */
const mapZodErrors = (errors: IValidationError[]): string[] =>
  errors
    .reduce(
      (acc: z.ZodIssue[], cur: IValidationError) => acc.concat(cur.error.issues),
      []
    )
    .map(({ message }) => message);

/**
 * This middleware validates the ctx.request[prop] object.
 *
 * @return It returns a pretty printed error containing all issues.
 * In the success case it will enter the desired endpoint controller.
 */
export const validate = (
  validations: IValidation[],
  customCode = HTTP_STATUS.BAD_REQUEST
) => {
  return async (ctx: Context, next: Next) => {
    const errors: IValidationError[] = [];

    validations.forEach(async (validation) => {
      const { schema, reqProperty: prop } = validation;

      try {
        schema.parse(ctx.request[prop]);
      } catch (error) {
        if (error instanceof z.ZodError) {
          errors.push({ error, reqProperty: prop });
        }
      }
    });

    if (errors.length == 0) {
      return await next();
    }

    const prettyError = mapZodErrors(errors);
    logError('ZOD VALIDATION', '', errors);

    ctx.status = customCode;
    ctx.body = { message: prettyError };
  };
};
