import { ZodError, z } from 'zod';

import { Validate, ValidateIf, ValidateNested, validate } from '../lib';

describe('validate', () => {
  class Identity {
    @Validate(z.string().min(2).trim())
    name: string;

    @Validate(z.coerce.number().int().positive())
    age: number;
  }

  class User {
    @Validate(z.string().email().trim())
    email: string;

    @Validate(z.enum(['created', 'completed']).default('created'))
    state: 'created' | 'completed';

    @ValidateIf(cls => cls.state === 'completed')
    @ValidateNested(Identity)
    identity: Identity;
  }

  describe('with partial false', () => {
    describe('with valid data', () => {
      it('validates correctly and returns the validated object', () => {
        const data = {
          email: 'test@test.com',
          identity: { name: 'Josh', age: '21' },
        };

        expect(validate(User, data)).toEqual({
          email: 'test@test.com',
          state: 'created',
          identity: { name: 'Josh', age: 21 },
        });
      });
    });

    describe('with invalid data', () => {
      it('throws an exception of type ZodError', () => {
        const data = { email: 'test@test.com', identity: null };

        expect(() => validate(User, data)).toThrow(ZodError);
      });
    });
  });

  describe('with partial true', () => {
    describe('with valid data', () => {
      it('validates correctly and returns the validated object', () => {
        const data = { email: 'test@test.com' };

        expect(validate(User, data, true)).toEqual(data);
      });
    });

    describe('with invalid data', () => {
      it('throws an exception of type ZodError', () => {
        const data = { email: 'test' };

        expect(() => validate(User, data, true)).toThrow(ZodError);
      });
    });
  });
});
