<template>
  <yt-toolbar>
    <i class="material-icons px-8">menu</i>
    <yt-img :src="logo.src" :alt="logo.alt" :height="20" />
  </yt-toolbar>

  <div class="container">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Logo from '../assets/youtube-logo-light.png'

export default defineComponent({
  setup() {
    const logo = ref({
      src: Logo,
      alt: 'Youtube-you-space-theme',
    })

    return {
      logo,
    }
  },
})
</script>
