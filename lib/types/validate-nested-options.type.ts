export type ValidateNestedOptions = ({ isArray?: false } | { isArray: true; min?: number; max?: number }) &
  ({ nullish: true } | { optional?: boolean; nullable?: boolean; nullish?: false });
