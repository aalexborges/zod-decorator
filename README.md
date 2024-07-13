# zod-decorator

Adds decorators allowing to use [Zod](https://zod.dev/) validation schemas in classes.

## Installation

```bash
npm install zod-decorator zod reflect-metadata --save
```

## Usage

Create your class and place some validation decorator with the zod schema on the properties you want to validate:

```ts
import { z } from 'zod';
import { Validate, validate } from 'zod-decorator';

export class User {
  @Validate(z.coerce.number().int().min(16))
  age?: number;

  @Validate(z.string().min(2).trim())
  name: string;

  @Validate(z.string().email().trim())
  email: string;

  @Validate(z.coerce.date())
  createdAt: Date;
}

const user = new User();

user.email = 'example@email.com';
user.createdAt = new Date();

validate(user); // throws ZodError
```

## Parsing

| Function           | Description                                                                             |
| ------------------ | --------------------------------------------------------------------------------------- |
| `getSchema`        | Gets the validation schema for a given object class based on the decorators used on it. |
| `getSchemaByPlain` | Gets the validation schema for a given object class based on the decorators used on it. |
| `validate`         | Performs validation on the given object class based on the decorators used in it.       |
| `validateByPlain`  | Performs validation of the given object based on decorators used in given object class. |

## Decorators

| Decorator                                                        | Description                                                               |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `@Validate(schema: ZodSchema)`                                   | Validates the field with the informed schema                              |
| `@ValidateIf(conditional: ConditionalCallback)`                  | Makes the field required if the callback function returns `true`          |
| `@ValidateNested(cls: Type<T>, options?: ValidateNestedOptions)` | Objects / object arrays marked with this decorator will also be validated |
