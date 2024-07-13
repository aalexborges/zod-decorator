import { ZodSchema, z } from 'zod';

import { ZOD_CV_CONDITIONAL, ZOD_CV_SCHEMA } from '../constants';
import { Type } from '../interfaces/type.interface';
import { ConditionalCallback } from '../types/conditional-callback.type';

/**
 * Gets the validation schema for a given object class based on the decorators used on it.
 */
export function getSchemaByPlain<T>(cls: Type<T>, data: Record<string, any> = {}) {
  const baseSchema: Record<string, ZodSchema> = Reflect.getMetadata(ZOD_CV_SCHEMA, cls) || {};
  const conditionals: Record<string, ConditionalCallback> = Reflect.getMetadata(ZOD_CV_CONDITIONAL, cls) || {};

  const schema = { ...baseSchema };

  for (const [key, callback] of Object.entries(conditionals)) {
    if (callback(data)) {
      if (schema[key]?.isOptional()) {
        schema[key] = z.object({ [key]: schema[key] }).required({ [key]: true }).shape[key];
      }

      continue;
    }

    if (!schema[key]?.isOptional()) schema[key] = schema[key]?.optional();
  }

  return z.object(schema);
}
