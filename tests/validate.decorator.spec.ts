import { z } from 'zod';

import { Validate } from '../lib';
import { ZOD_CV_SCHEMA } from '../lib/constants';

describe('Validate', () => {
  class Test {
    @Validate(z.string().email().trim())
    email: string;

    @Validate(z.coerce.number().int().positive().min(16))
    age: number;
  }

  it('defines the schema correctly', () => {
    const metadata = Reflect.getMetadata(ZOD_CV_SCHEMA, Test);

    expect(JSON.stringify(metadata)).toEqual(
      JSON.stringify({
        email: z.string().email().trim(),
        age: z.coerce.number().int().positive().min(16),
      }),
    );
  });
});
