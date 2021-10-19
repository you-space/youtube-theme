<template>
  <router-link v-if="to" :active-class="activeClass" :to="to" :class="classes">
    <slot />
  </router-link>

  <div v-else :class="classes">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    to: {
      type: [Object, String],
      default: null,
    },
    activeClass: {
      type: String,
      default: 'yt-item-active',
    },
  },
  setup(props) {
    const classes = ['yt-item']

    if (props.to) {
      classes.push('yt-item-clickble')
    }

    return {
      classes,
    }
  },
})
</script>

<style lang="postcss">
.yt-item {
  @apply flex w-full px-6 py-3;
}

.yt-link-clickable {
  @apply cursor-pointer;
  @apply hover:bg-gray-200 dark:hover:bg-gray-600;
}

.yt-item-active {
  @apply bg-gray-100 dark:bg-gray-600;
}
</style>
