import { ZodArray, ZodSchema, z } from 'zod';

import { ZOD_CV_SCHEMA } from '../constants';
import { Type } from '../interfaces/type.interface';
import { ValidateNestedOptions } from '../types/validate-nested-options.type';
import { getSchema } from '../utils/get-schema';

export function ValidateNested<T>(cls: Type<T>, options: ValidateNestedOptions = {}) {
  return (target: any, key: string) => {
    const metadata: Record<string, ZodSchema> = Reflect.getMetadata(ZOD_CV_SCHEMA, target.constructor) || {};
    const nestedSchema = getSchema(cls);

    let schema: ZodSchema = options.isArray ? z.array(nestedSchema) : nestedSchema;

    if (options.isArray && schema instanceof ZodArray) {
      if (typeof options.min === 'number') schema = schema.min(options.min);
      if (typeof options.max === 'number') schema = (schema as ZodArray<any>).max(options.max);
    }

    if (options.nullish) schema = schema.nullish();
    else {
      if (options.nullable) schema = schema.nullable();
      if (options.optional) schema = schema.optional();
    }

    Reflect.defineMetadata(ZOD_CV_SCHEMA, { ...metadata, [key]: schema }, target.constructor);
  };
}
