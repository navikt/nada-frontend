import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'http://127.0.0.1:8080/api/query',
  documents: ['lib/queries/*/*.ts'],
  generates: {
    'lib/schema/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withMutationFn: true,
        withMutationOptionsType: true,
        scalars: { Date: 'string', DateTime: 'string', String: 'string', Int: 'number', Float: 'number', Boolean: 'boolean'},        
      },
    }
  },
  hooks: {
    afterAllFileWrite: ['prettier --write lib/queries'],
  },
}
export default config
