<template>
  <i class="material-icons">
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
