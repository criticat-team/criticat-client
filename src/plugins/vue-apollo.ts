import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { typeDefs } from '@/state/typeDefs';
import { resolvers } from '@/state/resolvers';
import { initialize } from '@/state/initialize';

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_HTTP,
});

const cache = new InMemoryCache();
initialize(cache);

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
});
