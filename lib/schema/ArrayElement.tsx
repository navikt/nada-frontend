// Hack to infer the type of an array's elements.
// This enables us to reference the GraphQL schema directly.
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never
