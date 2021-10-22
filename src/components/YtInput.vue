<template>
  <label class="yt-input">
    <span v-if="label">{{ label }}</span>
    <input v-bind="$attrs" class="" />
  </label>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {}
  },
})
</script>
<style lang="postcss">
.yt-input input {
  @apply focus:outline-none;
  @apply w-full rounded px-4 py-2;
  @apply border;
  @apply focus:border-red-500 dark:focus:bg-gray-500 dark:bg-gray-700 dark:text-white dark:border-gray-700;
  @apply transition-colors;
}
</style>
