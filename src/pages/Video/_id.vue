<template>
  <div>video: {{ id }}</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup() {},
})
</script>
