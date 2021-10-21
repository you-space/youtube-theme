<template>
  <yt-infinite-scroll @end="loadMoreVideos">
    <div class="px-12 py-4">
      <div v-if="slide.current" class="flex flex-wrap justify-between">
        <div class="w-5/12 flex flex-wrap pr-4 pt-6">
          <div class="w-full overflow-auto" style="max-height: 350px">
            <h2 class="text-4xl font-bold mb-4">{{ slide.current.title }}</h2>
            <p class="whitespace-pre-line leading-relaxed">
              {{ slide.current.description.slice(0, 500) }}
              {{ slide.current.description.length > 500 ? '...' : '' }}
            </p>
          </div>

          <div class="w-full self-end">
            <div class="flex mb-8 mt-4">
              <div v-for="(tag, index) in slide.current.tags" :key="index" class="pr-2">
                <yt-chip>
                  {{ tag }}
                </yt-chip>
              </div>
            </div>

            <div class="flex">
              <div
                v-for="(item, index) in slide.items"
                :key="index"
                class="h-2 w-2 mr-2 cursor-pointer rounded-full bg-red-500 dark:bg-white"
                :class="slide.items.indexOf(slide.current) === index ? 'opacity-100' : 'opacity-30'"
                @click="slide.current = item"
              />
            </div>
          </div>
        </div>

        <div class="w-5/12 flex justify-end relative" style="max-height: 350px">
          <yt-video-card
            :video="slide.current"
            :img-height="350"
            hide-title
            hide-description
            class="w-full hover:shadow-md"
          />
        </div>
      </div>

      <div class="my-8" />

      <div class="flex flex-wrap -mx-4">
        <div class="w-full mb-2">
          <h3 class="font-bold px-4 text-xl">Recommended</h3>
        </div>
        <div v-for="(video, index) in videos" :key="index" class="w-3/12 p-4">
          <yt-video-card
            :video="video"
            style="height: 400px"
            class="shadow bg-white dark:bg-gray-800"
          />
        </div>
      </div>
      <div class="w-full justify-center flex" style="height: 50px">
        <yt-spin v-show="loading" :height="40" />
      </div>
    </div>
  </yt-infinite-scroll>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { fetchVideos, Video } from './compositions/fetch'

export default defineComponent({
  inheritAttrs: false,
  setup() {
    const loading = ref(false)

    const slide = ref({
      current: null as null | Video,
      items: [] as Video[],
    })

    const videos = ref<Video[]>([])

    const lastPage = ref()
    const currentPage = ref(0)

    function setSlide() {
      slide.value.items = videos.value.slice(0, 3)
      slide.value.current = slide.value.items[0]
    }

    async function addPage(page = 1) {
      loading.value = true

      await fetchVideos({ page })
        .catch((err) => {
          throw new Error(err)
        })
        .then(({ data, meta }) => {
          videos.value = videos.value.concat(data)
          currentPage.value = meta.current_page
          lastPage.value = meta.last_page
        })

      setTimeout(() => {
        loading.value = false
      }, 800)
    }

    async function loadMoreVideos() {
      if (currentPage.value && currentPage.value === lastPage.value) {
        return
      }

      await addPage(currentPage.value + 1)
    }

    async function load() {
      await loadMoreVideos()
      setSlide()
    }

    load()

    return {
      loading,
      slide,
      videos,
      loadMoreVideos,
    }
  },
})
</script>
