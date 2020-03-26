<template>
  <v-layout column no-wrap>
    <v-flex v-for="(n, index) in nDisplayedLiveStreams" :key="index" xs12 sm12 lg6 xl4>
      <live-stream-item :live-stream="loadedLiveStreams[index]" />
    </v-flex>
  </v-layout>
</template>

<script>
import LiveStreamItem from '@/components/live-streams/LiveStreamItem';
import getLiveStreamsGql from '@/gql/getLiveStreams.gql';

export default {
  components: {
    LiveStreamItem,
  },
  data() {
    return {
      language: 'ca',
      itemsPerPage: 5,
      page: 1,
      isFetchingMore: false,
    };
  },
  computed: {
    initialLoadHasFinished() {
      return this.liveStreams != null;
    },
    loadedLiveStreams() {
      console.log(this.initialLoadHasFinished, this.liveStreams);
      return this.initialLoadHasFinished ? this.liveStreams.streams : [];
    },
    nDisplayedLiveStreams() {
      return this.loadedLiveStreams.length;
    },
    canFetchMore() {
      return this.initialLoadHasFinished && this.liveStreams.continuation != null;
    },
  },
  apollo: {
    liveStreams: {
      query: getLiveStreamsGql,
      variables() {
        return {
          language: this.language,
          itemsPerPage: this.itemsPerPage,
          offset: 0,
        };
      },
    },
  },
  methods: {
    fetchMore() {
      this.isFetchingMore = true;
      this.$apollo.queries.liveStreams
        .fetchMore({
          variables: {
            language: this.language,
            itemsPerPage: this.itemsPerPage,
            offset: this.liveStreams.offset,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            return {
              liveStreams: {
                // eslint-disable-next-line no-underscore-dangle
                __typename: previousResult.liveStreams.__typename,
                streams: [
                  ...previousResult.liveStreams.streams,
                  ...fetchMoreResult.liveStreams.streams,
                ],
                offset: 0,
              },
            };
          },
        })
        .then(() => (this.isFetchingMore = false));
    },
  },
};
</script>
