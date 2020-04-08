import gql from 'graphql-tag';

export const categoriesQuery = gql`
  query {
    categories @client {
      id
      icon
      color
    }
  }
`;

export const currentCategoryQuery = gql`
  query {
    currentCategory @client {
      id
      icon
      color
    }
  }
`;

export const categoryQuery = gql`
  query($id: ID!) {
    category(id: $id) @client {
      id
      icon
      color
    }
  }
`;
