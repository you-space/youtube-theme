<template>
  <router-link v-if="to" v-bind="attrs" :to="to">
    <slot />
  </router-link>

  <div v-else v-bind="attrs">
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
    clickable: {
      type: Boolean,
      default: false,
    },
    activeClass: {
      type: String,
      default: 'yt-item-active',
    },
  },
  setup(props) {
    const classes = ['yt-item']

    if (props.to || props.clickable) {
      classes.push('yt-item-clickable')
    }

    const attrs = {
      class: classes,
      activeClass: props.activeClass,
    }

    return {
      attrs,
    }
  },
})
</script>

<style lang="postcss">
.yt-item {
  @apply flex w-full px-6 py-3;
}

.yt-item-clickable {
  @apply cursor-pointer;
  @apply hover:bg-gray-200 dark:hover:bg-gray-600;
}

.yt-item-active {
  @apply bg-gray-100 dark:bg-gray-600;
}
</style>
