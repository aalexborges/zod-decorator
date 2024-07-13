export type ConditionalMetadata = {
  conditional: (cls: Record<string, any>) => boolean;
  nullish: boolean;
};
