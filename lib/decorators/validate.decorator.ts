import { ZodSchema } from 'zod';

import { ZOD_CV_SCHEMA } from '../constants';

/**
 * Validates the field with the informed schema
 */
export function Validate(schema: ZodSchema) {
  return (target: any, key: string) => {
    const metadata: Record<string, ZodSchema> = Reflect.getMetadata(ZOD_CV_SCHEMA, target.constructor) || {};

    Reflect.defineMetadata(ZOD_CV_SCHEMA, { ...metadata, [key]: schema }, target.constructor);
  };
}
