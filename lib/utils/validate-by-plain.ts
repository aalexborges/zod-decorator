import _ from 'lodash';

import { getSchemaByPlain } from './get-schema-by-plain';
import { Type } from '../interfaces/type.interface';

/**
 * Performs validation of the given object based on decorators used in given object class.
 */
export function validateByPlain<T>(cls: Type<T>, data: Record<string, any>, partial: boolean = false) {
  if (partial) return _.merge(new cls(), getSchemaByPlain(cls, data).partial().parse(data));
  return _.merge(new cls(), getSchemaByPlain(cls, data).parse(data));
}
