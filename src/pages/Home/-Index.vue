<template>
  <div class="px-12 py-4">
    <div v-if="slide.current" class="flex flex-wrap justify-between">
      <div class="w-5/12 flex flex-wrap pr-4 pt-6">
        <div class="w-full">
          <h2 class="text-4xl font-bold mb-4">{{ slide.current.title }}</h2>
          <p class="whitespace-pre-line leading-relaxed">{{ slide.current.description }}</p>
        </div>

        <div class="w-full self-end">
          <div class="flex mb-8 mt-4">
            <div v-for="(tag, index) in slide.current.tags" :key="index" class="pr-2">
              <div class="rounded-sm uppercase bg-red-500 text-white font-bold text-xs px-4 py-1">
                {{ tag }}
              </div>
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

      <div class="w-6/12 flex justify-end relative">
        <yt-img
          :src="slide.current.thumbnail.src"
          :alt="slide.current.thumbnail.alt"
          class="object-cover w-full"
          :height="350"
        />
        <div
          class="
            absolute
            py-1
            px-4
            text-xs
            mx-2
            my-2
            rounded-sm
            bg-black
            opacity-80
            bottom-0
            right-0
            z-10
            text-white
          "
        >
          {{ slide.current.time }}
        </div>
        <div
          class="absolute inset-0 bg-black opacity-40 hover:opacity-0 transition-opacity z-0"
        ></div>
      </div>
    </div>

    <div class="my-8" />

    <div class="flex flex-wrap -mx-4">
      <div class="w-full">
        <h3 class="font-bold px-4 text-xl">Recommended</h3>
      </div>
      <div v-for="(video, index) in videos" :key="index" class="w-3/12 p-4">
        <div class="shadow bg-white dark:bg-gray-800" style="height: 400px">
          <div class="relative">
            <yt-img
              :src="video.thumbnail.src"
              :alt="video.thumbnail.alt"
              :height="200"
              class="w-full object-cover"
            />
            <div
              class="
                absolute
                py-1
                px-4
                text-xs
                mx-2
                my-2
                rounded-sm
                bg-black
                opacity-80
                bottom-0
                right-0
                text-white
              "
            >
              {{ video.time }}
            </div>
          </div>
          <div class="p-4">
            <h2 class="text-lg font-bold mb-4">
              {{ video.title }}
            </h2>
            <p class="whitespace-pre-line text-sm">
              {{ video.description.slice(0, 150) }}
              {{ video.description.length > 150 ? '...' : '' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import faker from 'faker'

export default defineComponent({
  setup() {
    const slide = ref<any>({
      current: null,
      items: [],
    })

    const videos = ref<any[]>([])

    function setSlide() {
      for (let i = 0; i < 4; i++) {
        slide.value.items.push({
          title: faker.name.title(),
          thumbnail: {
            src: faker.image.image(),
            alt: faker.name.findName(),
          },
          description: faker.lorem.paragraphs(2),
          tags: ['games', 'animes', 'gameplay'],
          time: faker.datatype.number(59).toFixed(2).replace('.', ':'),
        })
      }

      slide.value.current = slide.value.items[0]
    }

    function setVideos() {
      for (let i = 0; i < 12; i++) {
        videos.value.push({
          title: faker.name.title(),
          thumbnail: {
            src: faker.image.image(),
            alt: faker.name.findName(),
          },
          description: faker.lorem.paragraphs(1),
          tags: ['games', 'animes', 'gameplay'],
          time: faker.datatype.number(59).toFixed(2).replace('.', ':'),
        })
      }
    }

    setSlide()
    setVideos()

    return {
      slide,
      videos,
    }
  },
})
</script>
