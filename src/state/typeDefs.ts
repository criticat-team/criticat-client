import gql from 'graphql-tag';

// types
export const typeDefs = gql`
  type Query {
    categories: [Category]
    category(id: ID!): Category
    currentCategory: Category
  }

  type Category {
    id: ID!
    icon: String
    color: String
  }

  type Mutation {
    setCurrentCategory(id: ID!): Boolean
  }
`;
