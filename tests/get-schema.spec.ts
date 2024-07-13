import { z } from 'zod';

import { Validate, ValidateIf, ValidateNested, getSchema } from '../lib';

describe('getSchema', () => {
  class Identity {
    @Validate(z.string().min(2).trim())
    name: string;
  }

  describe('with an instance of the class', () => {
    class User {
      @Validate(z.enum(['created', 'completed']).default('created'))
      state: 'created' | 'completed';

      @ValidateIf(cls => cls.state === 'completed')
      @ValidateNested(Identity)
      identity?: Identity;
    }

    it('returns the schema correctly', () => {
      const schema = getSchema(new User());

      expect(JSON.stringify(schema.shape)).toEqual(
        JSON.stringify(
          z.object({
            state: z.enum(['created', 'completed']).default('created'),
            identity: z
              .object({ name: z.string().min(2).trim() })
              .transform(v => v)
              .optional(),
          }).shape,
        ),
      );
    });

    describe('with the ValidateIf conditional returning true', () => {
      class User {
        @Validate(z.enum(['created', 'completed']).default('created'))
        state: 'created' | 'completed';

        @ValidateIf(cls => cls.state === 'completed')
        @ValidateNested(Identity, { optional: true })
        identity?: Identity;
      }

      it('returns the schema correctly', () => {
        const instance = new User();
        instance.state = 'completed';

        const schema = getSchema(instance);

        expect(JSON.stringify(schema.shape)).toEqual(
          JSON.stringify(
            z.object({
              state: z.enum(['created', 'completed']).default('created'),
              identity: z.object({ name: z.string().min(2).trim() }).transform(v => v),
            }).shape,
          ),
        );
      });
    });
  });
});
