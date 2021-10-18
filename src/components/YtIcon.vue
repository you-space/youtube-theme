<template>
  <i class="material-icons dark:text-white">
    {{ name }}
  </i>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
})
</script>
