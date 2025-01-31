import { ZodSchema, z } from 'zod';

import { ZOD_CV_CONDITIONAL, ZOD_CV_SCHEMA } from '../constants';
import { ConditionalCallback } from '../types/conditional-callback.type';

/**
 * Gets the validation schema for a given object class based on the decorators used on it.
 */
export function getSchema<T extends object>(object: T) {
  const constructor = object?.constructor;

  const baseSchema: Record<string, ZodSchema> = Reflect.getMetadata(ZOD_CV_SCHEMA, constructor) || {};
  const conditionals: Record<string, ConditionalCallback> = Reflect.getMetadata(ZOD_CV_CONDITIONAL, constructor) || {};

  const schema = { ...baseSchema };

  for (const [key, callback] of Object.entries(conditionals)) {
    if (callback(object)) {
      if (schema[key]?.isOptional()) {
        schema[key] = z.object({ [key]: schema[key] }).required({ [key]: true }).shape[key];
      }

      continue;
    }

    if (!schema[key]?.isOptional()) schema[key] = schema[key]?.optional();
  }

  return z.object(schema);
}
