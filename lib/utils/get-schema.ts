import { ZodSchema, z } from 'zod';

import { ZOD_CV_CONDITIONAL, ZOD_CV_SCHEMA } from '../constants';
import { Type } from '../interfaces/type.interface';
import { ConditionalMetadata } from '../types/conditional-metadata.type';

export function getSchema<T>(cls: Type<T>, data: Record<string, any> = {}) {
  const schema: Record<string, ZodSchema> = Reflect.getMetadata(ZOD_CV_SCHEMA, cls) || {};
  const conditionals: Record<string, ConditionalMetadata> = Reflect.getMetadata(ZOD_CV_CONDITIONAL, cls) || {};

  for (const [key, object] of Object.entries(conditionals)) {
    if (object.conditional(data)) {
      if (schema[key]?.isOptional()) {
        schema[key] = z.object({ [key]: schema[key] }).required({ [key]: true }).shape[key];
      }

      continue;
    }

    if (object.nullish) schema[key] = schema[key]?.nullish();
    else schema[key] = schema[key]?.optional();
  }

  return z.object(schema);
}
