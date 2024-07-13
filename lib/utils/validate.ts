import { getSchema } from './get-schema';
import { Type } from '../interfaces/type.interface';

export function validate<T>(cls: Type<T>, data: Record<string, any>, partial: boolean = false) {
  if (partial) return getSchema(cls, data).partial().parse(data);
  return getSchema(cls, data).parse(data);
}
