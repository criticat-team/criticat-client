<template>
  <div class="d-flex flex-column fill-height">
    <div>
      <v-responsive width="100%" :aspect-ratio="16 / 9">
        <v-skeleton-loader height="100%" tile type="image" />
      </v-responsive>
    </div>
    <v-card-subtitle class="pb-0 d-flex align-center">
      <v-skeleton-loader class="mr-3" type="image" height="16" width="16" />
      <v-skeleton-loader type="text" height="12" width="100" />
    </v-card-subtitle>
    <div class="flex-grow-1">
      <v-skeleton-loader type="article" />
    </div>
    <v-card-actions>
      <v-skeleton-loader width="100%" type="button" />
    </v-card-actions>
  </div>
</template>
