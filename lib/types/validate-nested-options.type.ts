export type ValidateNestedOptions = (
  | {
      /**
       * Mark the field as an array
       */
      isArray?: false;
    }
  | {
      /**
       * Mark the field as an array
       */
      isArray: true;

      /**
       * When the field is marked as an array, this option can be filled in to define the minimum number of items it must contain
       */
      min?: number;

      /**
       * When the field is marked as an array, this option can be filled in to define the maximum number of items it must contain
       */
      max?: number;
    }
) &
  (
    | {
        /**
         * When true, the field can also be `null | undefined`
         */
        nullish: true;
      }
    | {
        /**
         * When true, the field can be `undefined`
         */
        optional?: boolean;

        /**
         * When true, the field can be `null`
         */
        nullable?: boolean;

        /**
         * When true, the field can also be `null | undefined`
         */
        nullish?: false;
      }
  );
