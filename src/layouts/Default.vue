<template>
  <yt-layout>
    <yt-toolbar>
      <i class="material-icons px-6 cursor-pointer" @click="drawer = !drawer">menu</i>
      <yt-img :src="logo.src" :alt="logo.alt" :height="20" />
      <button @click="$store.commit('setDark', !$store.state.dark)">Toggle</button>
    </yt-toolbar>

    <yt-drawer v-model="drawer"> links </yt-drawer>

    <yt-content class="bg-gray-100 h-full">
      <router-view />
    </yt-content>
  </yt-layout>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import LightLogo from '../assets/youtube-logo-light.svg'
import { useStore } from '../store'
import DarkLogo from '../assets/youtube-logo-dark.svg'

export default defineComponent({
  setup() {
    const store = useStore()

    const logo = computed(() => {
      const img = {
        src: LightLogo,
        alt: 'Youtube you-space theme',
      }

      if (store.state.dark) {
        img.src = DarkLogo
      }

      return img
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
