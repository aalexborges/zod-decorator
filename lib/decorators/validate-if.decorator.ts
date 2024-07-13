import { ZodSchema } from 'zod';

import { ZOD_CV_CONDITIONAL } from '../constants';

export function ValidateIf(conditional: (cls: Record<string, any>) => boolean, nullish = false) {
  return (target: any, key: string) => {
    const metadata: Record<string, ZodSchema> = Reflect.getMetadata(ZOD_CV_CONDITIONAL, target.constructor) || {};

    Reflect.defineMetadata(ZOD_CV_CONDITIONAL, { ...metadata, [key]: { conditional, nullish } }, target.constructor);
  };
}
