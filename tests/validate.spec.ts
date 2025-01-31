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
        const instance = new User();

        instance.email = 'test@test.com';
        instance.identity = <any>{ name: 'Josh', age: '21' };

        const result = validate(instance);

        expect(result).toBeInstanceOf(User);
        expect(result).toEqual({
          email: 'test@test.com',
          state: 'created',
          identity: { name: 'Josh', age: 21 },
        });
        expect(result.identity).toBeInstanceOf(Identity);

        expect(instance).toEqual({
          email: 'test@test.com',
          state: 'created',
          identity: { name: 'Josh', age: 21 },
        });
        expect(instance.identity).toBeInstanceOf(Identity);
      });
    });

    describe('with invalid data', () => {
      it('throws an exception of type ZodError', () => {
        const instance = new User();

        instance.email = 'test@test.com';
        instance.identity = null as any;

        expect(() => validate(instance)).toThrow(ZodError);
      });
    });
  });

  describe('with partial true', () => {
    describe('with valid data', () => {
      it('validates correctly and returns the validated object', () => {
        const instance = new User();

        instance.email = 'test@test.com';

        const result = validate(instance, true);

        expect(result).toBeInstanceOf(User);
        expect(result).toEqual({ email: 'test@test.com' });
      });
    });

    describe('with invalid data', () => {
      it('throws an exception of type ZodError', () => {
        const instance = new User();

        instance.email = 'test';

        expect(() => validate(instance, true)).toThrow(ZodError);
      });
    });
  });
});
