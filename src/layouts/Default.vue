<template>
  <yt-layout>
    <yt-toolbar>
      <yt-icon class="px-6 cursor-pointer" name="menu" @click="drawer = !drawer" />
      <yt-img :src="logo.src" :alt="logo.alt" :height="20" />

      <div class="flex-1"></div>

      <yt-icon
        class="cursor-pointer px-6"
        :name="$store.state.dark ? 'light_mode' : 'dark_mode'"
        @click="$store.commit('setDark', !$store.state.dark)"
      />
    </yt-toolbar>

    <yt-drawer v-model="drawer">
      <yt-list>
        <yt-item v-for="(link, index) in links" :key="index" :to="link.to">
          <yt-icon class="mr-4" :name="link.icon" />
          <span v-if="drawer">
            {{ link.label }}
          </span>
        </yt-item>
      </yt-list>
    </yt-drawer>

    <yt-content class="bg-gray-100 h-full">
      <slot />
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
        label: 'Home',
        icon: 'home',
        to: {
          name: 'home',
        },
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
