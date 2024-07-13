import { z } from 'zod';

import { Validate, ValidateIf } from '../lib';
import { ZOD_CV_CONDITIONAL } from '../lib/constants';

describe('ValidateIf', () => {
  describe('with nullish false', () => {
    it('defines the schema correctly', () => {
      const conditional = (cls: any) => cls.state === 'completed';

      class Test {
        @Validate(z.string().min(2).trim())
        @ValidateIf(conditional)
        name?: string;

        @Validate(z.enum(['created', 'completed']).default('created'))
        state: 'created' | 'completed';
      }

      const conditionalMetadata = Reflect.getMetadata(ZOD_CV_CONDITIONAL, Test);

      expect(conditionalMetadata).toEqual({ name: conditional });
    });
  });

  describe('with nullish true', () => {
    it('defines the schema correctly', () => {
      const conditional = (cls: any) => cls.state === 'completed';

      class Test {
        @Validate(z.string().min(2).trim())
        @ValidateIf(conditional)
        name?: string;

        @Validate(z.enum(['created', 'completed']).default('created'))
        state: 'created' | 'completed';
      }

      const conditionalMetadata = Reflect.getMetadata(ZOD_CV_CONDITIONAL, Test);

      expect(conditionalMetadata).toEqual({ name: conditional });
    });
  });
});
