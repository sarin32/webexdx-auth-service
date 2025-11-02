import { BadRequestError } from '@webexdx/koa-wrap/errors';
import type * as Joi from 'joi';

export function validateRequest<ValueType>(schema: Joi.Schema, data: unknown) {
  const {
    error,
    value,
  }: { error: Joi.ValidationError | undefined; value: ValueType } =
    schema.validate(data, {
      abortEarly: true,
      allowUnknown: true,
      errors: { escapeHtml: true },
    });

  if (error) {
    throw new BadRequestError(error.message);
  }

  return value;
}
