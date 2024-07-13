import _ from 'lodash';

import { getSchema } from './get-schema';

/**
 * Performs validation on the given object class based on the decorators used in it.
 */
export function validate<T extends object>(object: T, partial: boolean = false): T {
  if (partial) return _.mergeWith(object, getSchema(object).partial().parse(object));
  return _.mergeWith(object, getSchema(object).parse(object));
}
