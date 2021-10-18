<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
<style lang="postcss">
body {
  @apply text-gray-800 dark:text-white transition-colors ease-in;
}
</style>
