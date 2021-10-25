<script setup lang="ts">
import { defineProps, ref } from 'vue'

defineProps({
  id: {
    type: String,
    required: true,
  },
})

const dialog = ref(false)
</script>

<template>
  <div>video: {{ id }}</div>

  <yt-btn label="show" @click="dialog = true" />

  <yt-dialog v-model="dialog">
    <div class="h-96 bg-white">content</div>
  </yt-dialog>
</template>
