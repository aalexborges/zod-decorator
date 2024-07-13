import { ZodSchema } from 'zod';

import { ZOD_CV_CONDITIONAL } from '../constants';

/**
 * Makes the field required if the callback function returns true
 */
export function ValidateIf(conditional: (cls: Record<string, any>) => boolean) {
  return (target: any, key: string) => {
    const metadata: Record<string, ZodSchema> = Reflect.getMetadata(ZOD_CV_CONDITIONAL, target.constructor) || {};

    Reflect.defineMetadata(ZOD_CV_CONDITIONAL, { ...metadata, [key]: conditional }, target.constructor);
  };
}
