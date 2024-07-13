import { z } from 'zod';

import { Validate, ValidateIf, ValidateNested, getSchemaByPlain } from '../lib';

describe('getSchemaByPlain', () => {
  class Identity {
    @Validate(z.string().min(2).trim())
    name: string;
  }

  class User {
    @Validate(z.string().email().trim())
    email: string;

    @Validate(z.enum(['created', 'completed']).default('created'))
    state: 'created' | 'completed';

    @ValidateIf(cls => cls.state === 'completed')
    @ValidateNested(Identity, { nullish: true })
    identity?: Identity;
  }

  it('returns the schema correctly', () => {
    const schema = getSchemaByPlain(User);

    expect(JSON.stringify(schema.shape)).toEqual(
      JSON.stringify(
        z.object({
          email: z.string().email().trim(),
          state: z.enum(['created', 'completed']).default('created'),
          identity: z
            .object({ name: z.string().min(2).trim() })
            .transform(v => v)
            .nullish(),
        }).shape,
      ),
    );
  });

  describe('with the ValidateIf conditional returning true', () => {
    it('returns the schema correctly', () => {
      const schema = getSchemaByPlain(User, { state: 'completed' });

      expect(JSON.stringify(schema.shape)).toEqual(
        JSON.stringify(
          z.object({
            email: z.string().email().trim(),
            state: z.enum(['created', 'completed']).default('created'),
            identity: z
              .object({ name: z.string().min(2).trim() })
              .transform(v => v)
              .nullable(),
          }).shape,
        ),
      );
    });
  });
});
