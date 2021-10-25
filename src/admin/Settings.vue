<template>
  <h2 class="mt-0 mb-4 text-4xl font-bold">Slide</h2>

  <yt-switch v-model="settings.enable" label="Enable slide" class="mb-4" />

  <div class="flex justify-between items-baseline mb-4">
    <h3 class="text-sm font-bold">Items</h3>
    <yt-btn label="Add new" @click="dialog = true" />
  </div>

  <yt-list class="border border-gray-300 border-solid mb-4 bg-white rounded max-h-96 overflow-auto">
    <yt-item class="border-b font-bold border-gray-300">
      <div class="w-1/12">#</div>
      <div class="w-2/12">Thumbnail</div>
      <div class="flex-1 px-4">Title</div>
    </yt-item>

    <yt-item v-if="!settings.items.length" class="justify-center font-bold"> No items </yt-item>

    <yt-item
      v-for="(item, index) in settings.items"
      :key="index"
      :class="[index < settings.items.length - 1 ? 'border-b border-gray-300' : '']"
      class="items-center"
    >
      <div class="w-1/12">#{{ item.id }}</div>

      <div class="w-2/12">
        <yt-img :src="item.thumbnail.src" :height="60" />
      </div>

      <div class="flex-1 px-4">
        {{ item.title }}
      </div>

      <div>
        <yt-icon
          name="close"
          class="text-xl cursor-pointer"
          @click="settings.items.splice(index, 1)"
        />
      </div>
    </yt-item>
  </yt-list>

  <yt-dialog v-model="dialog">
    <div class="bg-white rounded p-4 w-full max-w-lg" style="min-height: 300px">
      <div class="text-lg mb-4">Select a video</div>

      <yt-input v-model="search.query" class="mb-4" placeholder="search..." />

      <yt-list>
        <yt-item v-if="!search.results.length"> No results found </yt-item>

        <yt-item
          v-for="(item, index) in search.results"
          :key="index"
          clickable
          @click="addVideo(item)"
        >
          <yt-img class="w-1/12 mr-4" :src="item.thumbnail.src" :height="30" />
          <div class="text-sm font-bold">{{ item.title }}</div>
        </yt-item>
      </yt-list>
    </div>
  </yt-dialog>

  <yt-btn label="Save" :loading="loading" @click="save" />
</template>
<script lang="ts">
import space from 'space'
import { debounce } from 'lodash'
import { ref, watch } from 'vue'
import { fetchVideos, Video } from '@/pages/Home/compositions/fetch'

export default {
  setup() {
    const loading = ref(false)
    const dialog = ref(false)
    const rules = {
      required: (value: string) => !!value || 'Field required',
    }

    const metaName = 'youtube-theme:settings:slide'

    const settings = ref({
      enable: false,
      items: [] as Video[],
    })

    const search = ref({
      selected: null as Video | null,
      results: [] as Video[],
      query: undefined as string | undefined,
    })

    const searchVideo = debounce(async (value?: string) => {
      const { data } = await fetchVideos({
        search: value,
        limit: 3,
      })

      search.value.results = data
    }, 500)

    async function setSettings() {
      const meta = await space.emit('meta:show', metaName)

      if (!meta) {
        return
      }

      settings.value.enable = meta.enable

      const { data } = await fetchVideos({
        id: meta.items.map((item: any) => item.id).join(','),
      })

      settings.value.items = data
    }

    async function load() {
      await setSettings()
      await searchVideo()
    }

    load()
    watch(() => search.value.query, searchVideo)

    async function save() {
      loading.value = true

      const data = {
        name: metaName,
        value: {
          enable: settings.value.enable,
          items: settings.value.items.map((item) => ({
            id: item.id,
            type: 'video',
          })),
        },
      }

      await space
        .emit('meta:update', data)
        .then(() => {
          alert('Settings updated')
          setSettings()
        })
        .catch((err) => {
          throw new Error(err)
        })

      setTimeout(() => {
        loading.value = false
      }, 800)
    }

    function addVideo(video: Video) {
      settings.value.items.push(video)
      search.value.query = ''
      search.value.results = []
      dialog.value = false
    }

    return {
      search,
      dialog,
      settings,
      loading,

      addVideo,
      save,
    }
  },
}
</script>
<style lang="postcss">
@tailwind components;
@tailwind utilities;
</style>
