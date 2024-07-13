import { z } from 'zod';

import { Validate, ValidateIf, ValidateNested, getSchema } from '../lib';

describe('getSchema', () => {
  class Identity {
    @Validate(z.string().min(2).trim())
    name: string;
  }

  class User {
    @Validate(z.string().email().trim())
    email: string;

    @Validate(z.enum(['created', 'completed']).default('created'))
    state: 'created' | 'completed';

    @ValidateIf(cls => cls.state === 'completed', true)
    @ValidateNested(Identity)
    identity: Identity;
  }

  it('returns the schema correctly', () => {
    const schema = getSchema(User);

    expect(JSON.stringify(schema.shape)).toEqual(
      JSON.stringify(
        z.object({
          email: z.string().email().trim(),
          state: z.enum(['created', 'completed']).default('created'),
          identity: z.object({ name: z.string().min(2).trim() }).nullish(),
        }).shape,
      ),
    );
  });

  describe('with the ValidateIf conditional returning true', () => {
    it('returns the schema correctly', () => {
      const schema = getSchema(User, { state: 'completed' });

      expect(JSON.stringify(schema.shape)).toEqual(
        JSON.stringify(
          z.object({
            email: z.string().email().trim(),
            state: z.enum(['created', 'completed']).default('created'),
            identity: z.object({ name: z.string().min(2).trim() }).nullable(),
          }).shape,
        ),
      );
    });
  });
});
