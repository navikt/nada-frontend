import { gql } from 'graphql-tag';

export const GET_JOINABLEVIEWINDETAIL = gql`
  query JoinableView($id: ID!) {
    joinableView(id: $id) {
      name
      created
      expires
      pseudoDatasources{
        bigqueryUrl
        accessible
        deleted
      }
    }
  }
`;