<template>
  <v-text-field flat solo-inverted hide-details :prepend-inner-icon="mdiMagnify" label="Search" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { mdiMagnify } from '@mdi/js';

export default defineComponent({
  setup() {
    return {
      mdiMagnify,
    };
  },
});
</script>
