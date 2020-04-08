import { categoriesQuery, currentCategoryQuery } from './queries';
import { Resolvers } from 'apollo-client';
import { ApolloCache } from 'apollo-cache';

type ResolverFn = (parent: any, args: any, { cache }: { cache: ApolloCache<any> }) => any;
interface ResolverMap {
  [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {
  Query: ResolverMap;
  Mutation: ResolverMap;
}

export const resolvers: AppResolvers = {
  Query: {
    category: (_, { id }, { cache }) => {
      let category = null;
      if (id != null) {
        const { categories } = cache.readQuery({ query: categoriesQuery });
        category = categories.find((category) => category.id === id);
      }
      return category;
    },
  },
  Mutation: {
    setCurrentCategory: (_, { id }, { cache }) => {
      console.log('setCurrentCategoryMutation', id);
      let currentCategory = null;
      if (id != null) {
        const { categories } = cache.readQuery({ query: categoriesQuery });
        currentCategory = categories.find((category) => category.id === id);
      }
      cache.writeQuery({
        query: currentCategoryQuery,
        data: {
          currentCategory,
        },
      });
      return true;
    },
  },
};
