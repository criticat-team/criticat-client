import gql from 'graphql-tag';

export const setCurrentCategoryMutation = gql`
  mutation($id: ID!) {
    setCurrentCategory(id: $id) @client
  }
`;
