import { z } from 'zod';

import { Validate, ValidateNested } from '../lib';
import { ZOD_CV_SCHEMA } from '../lib/constants';

describe('ValidateNested', () => {
  class Identity {
    @Validate(z.string().min(2).trim())
    name: string;
  }

  describe('with option isArray false', () => {
    it('defines the schema correctly', () => {
      class Test {
        @ValidateNested(Identity)
        identity: Identity;
      }

      const metadata = Reflect.getMetadata(ZOD_CV_SCHEMA, Test);

      expect(JSON.stringify(metadata)).toEqual(
        JSON.stringify({ identity: z.object({ name: z.string().min(2).trim() }) }),
      );
    });

    describe('with option { nullish: true }', () => {
      class Test {
        @ValidateNested(Identity, { nullish: true })
        identity: Identity;
      }

      const metadata = Reflect.getMetadata(ZOD_CV_SCHEMA, Test);

      expect(JSON.stringify(metadata)).toEqual(
        JSON.stringify({ identity: z.object({ name: z.string().min(2).trim() }).nullish() }),
      );
    });

    describe('with option { nullable: true }', () => {
      class Test {
        @ValidateNested(Identity, { nullable: true })
        identity: Identity;
      }

      const metadata = Reflect.getMetadata(ZOD_CV_SCHEMA, Test);

      expect(JSON.stringify(metadata)).toEqual(
        JSON.stringify({ identity: z.object({ name: z.string().min(2).trim() }).nullable() }),
      );
    });

    describe('with option { optional: true }', () => {
      class Test {
        @ValidateNested(Identity, { optional: true })
        identity: Identity;
      }

      const metadata = Reflect.getMetadata(ZOD_CV_SCHEMA, Test);

      expect(JSON.stringify(metadata)).toEqual(
        JSON.stringify({ identity: z.object({ name: z.string().min(2).trim() }).optional() }),
      );
    });

    describe('with option { nullable: true, optional: true }', () => {
      class Test {
        @ValidateNested(Identity, { nullable: true, optional: true })
        identity: Identity;
      }

      const metadata = Reflect.getMetadata(ZOD_CV_SCHEMA, Test);

      expect(JSON.stringify(metadata)).toEqual(
        JSON.stringify({
          identity: z
            .object({ name: z.string().min(2).trim() })
            .nullable()
            .optional(),
        }),
      );
    });

    describe('with the min to max option filled in', () => {
      class Test {
        @ValidateNested(Identity, <any>{ min: 0, max: 0 })
        identity: Identity;
      }

      const metadata = Reflect.getMetadata(ZOD_CV_SCHEMA, Test);

      expect(JSON.stringify(metadata)).toEqual(
        JSON.stringify({ identity: z.object({ name: z.string().min(2).trim() }) }),
      );
    });
  });

  describe('with option isArray true', () => {
    it('defines the schema correctly', () => {
      class Test {
        @ValidateNested(Identity, { isArray: true })
        identity: Identity;
      }

      const metadata = Reflect.getMetadata(ZOD_CV_SCHEMA, Test);

      expect(JSON.stringify(metadata)).toEqual(
        JSON.stringify({ identity: z.array(z.object({ name: z.string().min(2).trim() })) }),
      );
    });

    describe('with option { nullish: true }', () => {
      class Test {
        @ValidateNested(Identity, { isArray: true, nullish: true })
        identity: Identity;
      }

      const metadata = Reflect.getMetadata(ZOD_CV_SCHEMA, Test);

      expect(JSON.stringify(metadata)).toEqual(
        JSON.stringify({ identity: z.array(z.object({ name: z.string().min(2).trim() })).nullish() }),
      );
    });

    describe('with option { nullable: true }', () => {
      class Test {
        @ValidateNested(Identity, { isArray: true, nullable: true })
        identity: Identity;
      }

      const metadata = Reflect.getMetadata(ZOD_CV_SCHEMA, Test);

      expect(JSON.stringify(metadata)).toEqual(
        JSON.stringify({ identity: z.array(z.object({ name: z.string().min(2).trim() })).nullable() }),
      );
    });

    describe('with option { optional: true }', () => {
      class Test {
        @ValidateNested(Identity, { isArray: true, optional: true })
        identity: Identity;
      }

      const metadata = Reflect.getMetadata(ZOD_CV_SCHEMA, Test);

      expect(JSON.stringify(metadata)).toEqual(
        JSON.stringify({ identity: z.array(z.object({ name: z.string().min(2).trim() })).optional() }),
      );
    });

    describe('with option { nullable: true, optional: true }', () => {
      class Test {
        @ValidateNested(Identity, { isArray: true, nullable: true, optional: true })
        identity: Identity;
      }

      const metadata = Reflect.getMetadata(ZOD_CV_SCHEMA, Test);

      expect(JSON.stringify(metadata)).toEqual(
        JSON.stringify({
          identity: z
            .array(z.object({ name: z.string().min(2).trim() }))
            .nullable()
            .optional(),
        }),
      );
    });

    describe('with the min option filled in', () => {
      class Test {
        @ValidateNested(Identity, { isArray: true, min: 2 })
        identity: Identity;
      }

      const metadata = Reflect.getMetadata(ZOD_CV_SCHEMA, Test);

      expect(JSON.stringify(metadata)).toEqual(
        JSON.stringify({ identity: z.array(z.object({ name: z.string().min(2).trim() })).min(2) }),
      );
    });

    describe('with the max option filled in', () => {
      class Test {
        @ValidateNested(Identity, { isArray: true, max: 2 })
        identity: Identity;
      }

      const metadata = Reflect.getMetadata(ZOD_CV_SCHEMA, Test);

      expect(JSON.stringify(metadata)).toEqual(
        JSON.stringify({ identity: z.array(z.object({ name: z.string().min(2).trim() })).max(2) }),
      );
    });
  });
});
