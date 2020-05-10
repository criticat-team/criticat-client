<template>
  <v-window-item :style="style">
    <div class="fill-height">
      <slot />
    </div>
  </v-window-item>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';

export default defineComponent({
  setup(props, context) {
    const fullscreen = computed(() => context.root.$vuetify.breakpoint.xs);

    const height = computed(() => {
      return fullscreen.value ? '100%' : '600px';
    });

    const style = computed(() => ({
      height: height.value,
      maxHeight: height.value,
    }));

    return {
      style,
    };
  },
});
</script>
