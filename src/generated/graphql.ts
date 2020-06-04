import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from '@vue/composition-api';
export type Maybe<T> = T | null;
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Article = {
  __typename?: 'Article';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  origin?: Maybe<ArticleOrigin>;
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
  summary?: Maybe<ArticleSummary>;
  canonical?: Maybe<Array<Maybe<ArticleCanonical>>>;
  alternate?: Maybe<Array<Maybe<ArticleAlternate>>>;
};

export type ArticleAlternate = {
  __typename?: 'ArticleAlternate';
  href?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ArticleCanonical = {
  __typename?: 'ArticleCanonical';
  href?: Maybe<Scalars['String']>;
};

export type ArticleOrigin = {
  __typename?: 'ArticleOrigin';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  categories?: Maybe<Array<Maybe<ArticleOriginCategory>>>;
  url?: Maybe<Scalars['String']>;
  htmlUrl?: Maybe<Scalars['String']>;
  iconUrl?: Maybe<Scalars['String']>;
};

export type ArticleOriginCategory = {
  __typename?: 'ArticleOriginCategory';
  id?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
};

export type ArticlesStream = {
  __typename?: 'ArticlesStream';
  items?: Maybe<Array<Maybe<Article>>>;
  continuation?: Maybe<Scalars['String']>;
};

export type ArticleSummary = {
  __typename?: 'ArticleSummary';
  direction?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type Book = {
  __typename?: 'Book';
  title?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type LiveStream = {
  __typename?: 'LiveStream';
  id?: Maybe<Scalars['ID']>;
  gameId?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  startedAt?: Maybe<Scalars['String']>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  viewerCount?: Maybe<Scalars['Int']>;
  tagIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type LiveStreams = {
  __typename?: 'LiveStreams';
  items?: Maybe<Array<Maybe<LiveStream>>>;
  continuation?: Maybe<Scalars['String']>;
};

export type Movie = {
  __typename?: 'Movie';
  id?: Maybe<Scalars['ID']>;
  adult?: Maybe<Scalars['Boolean']>;
  backdropPath?: Maybe<Scalars['String']>;
  belongsToCollection?: Maybe<MovieCollection>;
  budget?: Maybe<Scalars['Int']>;
  genres?: Maybe<Array<Maybe<MovieGenre>>>;
  homepage?: Maybe<Scalars['String']>;
  images?: Maybe<MovieImages>;
  originalLanguage?: Maybe<Scalars['String']>;
  originalTitle?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Float']>;
  posterPath?: Maybe<Scalars['String']>;
  productionCompanies?: Maybe<Array<Maybe<MovieProductionCompany>>>;
  productionCountries?: Maybe<Array<Maybe<MovieProductionCountry>>>;
  releaseDate?: Maybe<Scalars['String']>;
  revenue?: Maybe<Scalars['Int']>;
  spokenLanguages?: Maybe<Array<Maybe<MovieSpokenLanguage>>>;
  status?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['Boolean']>;
  ratings?: Maybe<MovieRatings>;
};

export type MovieCollection = {
  __typename?: 'MovieCollection';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  posterPath?: Maybe<Scalars['String']>;
  backdropPath?: Maybe<Scalars['String']>;
};

export type MovieGenre = {
  __typename?: 'MovieGenre';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type MovieImage = {
  __typename?: 'MovieImage';
  filePath?: Maybe<Scalars['String']>;
  aspectRatio?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
  iso_639_1?: Maybe<Scalars['String']>;
  voteCount?: Maybe<Scalars['Int']>;
  voteAverage?: Maybe<Scalars['Float']>;
};

export type MovieImages = {
  __typename?: 'MovieImages';
  backdrops?: Maybe<Array<Maybe<MovieImage>>>;
  posters?: Maybe<Array<Maybe<MovieImage>>>;
};

export type MovieProductionCompany = {
  __typename?: 'MovieProductionCompany';
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  logoPath?: Maybe<Scalars['String']>;
  originCountry?: Maybe<Scalars['String']>;
};

export type MovieProductionCountry = {
  __typename?: 'MovieProductionCountry';
  iso_3166_1?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type MovieRatings = {
  __typename?: 'MovieRatings';
  tmdb?: Maybe<Scalars['String']>;
  imdb?: Maybe<Scalars['String']>;
  rottenTomatoes?: Maybe<Scalars['String']>;
  metacritic?: Maybe<Scalars['String']>;
};

export type MovieSpokenLanguage = {
  __typename?: 'MovieSpokenLanguage';
  iso_639_1?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  books?: Maybe<Array<Maybe<Book>>>;
  articles?: Maybe<ArticlesStream>;
  movie?: Maybe<Movie>;
  liveStreams?: Maybe<LiveStreams>;
};


export type QueryArticlesArgs = {
  category: Scalars['String'];
  itemsPerPage?: Maybe<Scalars['Int']>;
  continuation?: Maybe<Scalars['String']>;
};


export type QueryMovieArgs = {
  id: Scalars['ID'];
};


export type QueryLiveStreamsArgs = {
  itemsPerPage?: Maybe<Scalars['Int']>;
  continuation?: Maybe<Scalars['String']>;
};


export type GetArticlesQueryVariables = {
  category: Scalars['String'];
  itemsPerPage?: Maybe<Scalars['Int']>;
  continuation?: Maybe<Scalars['String']>;
};


export type GetArticlesQuery = (
  { __typename?: 'Query' }
  & { articles?: Maybe<(
    { __typename?: 'ArticlesStream' }
    & Pick<ArticlesStream, 'continuation'>
    & { items?: Maybe<Array<Maybe<(
      { __typename?: 'Article' }
      & Pick<Article, 'id' | 'title' | 'image' | 'url' | 'categories' | 'content'>
      & { origin?: Maybe<(
        { __typename?: 'ArticleOrigin' }
        & Pick<ArticleOrigin, 'title' | 'iconUrl'>
      )> }
    )>>> }
  )> }
);


export const GetArticlesDocument = gql`
    query getArticles($category: String!, $itemsPerPage: Int, $continuation: String) {
  articles(category: $category, itemsPerPage: $itemsPerPage, continuation: $continuation) {
    items {
      id
      title
      image
      url
      origin {
        title
        iconUrl
      }
      categories
      content
    }
    continuation
  }
}
    `;

/**
 * __useGetArticlesQuery__
 *
 * To run a query within a Vue component, call `useGetArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetArticlesQuery(
 *   {
 *      category: // value for 'category'
 *      itemsPerPage: // value for 'itemsPerPage'
 *      continuation: // value for 'continuation'
 *   }
 * );
 */
export function useGetArticlesQuery(variables: GetArticlesQueryVariables | VueCompositionApi.Ref<GetArticlesQueryVariables> | ReactiveFunction<GetArticlesQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables>> = {}) {
            return VueApolloComposable.useQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, variables, options);
          }
export type GetArticlesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetArticlesQuery, GetArticlesQueryVariables>;