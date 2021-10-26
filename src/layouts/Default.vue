<template>
  <yt-layout>
    <yt-toolbar>
      <yt-icon class="px-6 cursor-pointer" name="menu" @click="drawer = !drawer" />
      <yt-img :src="logo.src" :alt="logo.alt" :height="20" />

      <div class="flex-1 flex justify-center">
        <yt-autocomplete
          v-model="search.selected"
          v-model:search="search.query"
          :items="search.results"
          placeholder="Search"
          class="max-w-lg"
          item-label="title"
          item-value="id"
        >
          <template #item="{ item, select }">
            <yt-item clickable @click="select">
              <yt-video-card
                class="w-3/12 mr-4"
                :video="item"
                hide-title
                hide-description
                hide-footer
                :img-height="60"
              />
              <div>
                <div class="text-sm font-bold">{{ item.title }}</div>
                <div class="text-xs">{{ $moment(item.publishedAt).fromNow() }}</div>
              </div>
            </yt-item>
          </template>
        </yt-autocomplete>
      </div>

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

    <yt-content class="bg-gray-100 h-full" tabindex="-1">
      <slot />
    </yt-content>
  </yt-layout>
</template>
<script lang="ts">
import LightLogo from '../assets/youtube-logo-light.svg'
import DarkLogo from '../assets/youtube-logo-dark.svg'

import { debounce } from 'lodash'
import { defineComponent, ref, computed, watch } from 'vue'
import { useStore } from '../store'
import { fetchVideos, Video } from '@/pages/Home/compositions/fetch'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const search = ref({
      query: '',
      selected: null as Video | null,
      results: [] as Video[],
    })

    const drawer = ref(true)
    const links = [
      {
        label: 'Home',
        icon: 'home',
        to: '/',
      },
    ]

    const logo = computed(() => ({
      src: store.state.dark ? DarkLogo : LightLogo,
      alt: 'Youtube you-space theme',
    }))

    const searhcVideo = debounce(async (value: string) => {
      if (!value) return

      const { data } = await fetchVideos({
        search: value,
        // limit: 5,
      })

      search.value.results = data
    }, 500)

    watch(() => search.value.query, searhcVideo)
    watch(() => search.value.selected, showVideo)

    async function showVideo(video: Video | null) {
      if (!video) return

      await router.push(`/video/${video.id}`)

      search.value.query = ''
      search.value.selected = null
      search.value.results = []
    }

    return {
      search,
      logo,
      links,
      drawer,

      showVideo,
    }
  },
})
</script>
