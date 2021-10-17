<template>
  <yt-layout>
    <yt-toolbar>
      <i class="material-icons px-8 cursor-pointer" @click="drawer = !drawer">menu</i>
      <yt-img :src="logo.src" :alt="logo.alt" :height="20" />
    </yt-toolbar>

    <yt-drawer v-model="drawer"> links </yt-drawer>

    <yt-content class="bg-gray-100 h-full">
      <router-view />
    </yt-content>
  </yt-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Logo from '../assets/youtube-logo-light.png'

export default defineComponent({
  setup() {
    const logo = ref({
      src: Logo,
      alt: 'Youtube you-space theme',
    })

    const drawer = ref(true)

    const links = [
      {
        text: 'Home',
      },
    ]

    return {
      logo,
      links,
      drawer,
    }
  },
})
</script>
