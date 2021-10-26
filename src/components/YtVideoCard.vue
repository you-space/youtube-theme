<template>
  <div class="yt-video">
    <div class="relative w-full" :style="`height: ${imgHeight}px`">
      <yt-img
        :src="video.thumbnail.src"
        :alt="video.thumbnail.alt"
        height="100%"
        class="w-full object-cover"
      />
      <div v-if="video.duration" class="yt-video-time">
        {{ convertDuration(video.duration) }}
      </div>
    </div>
    <h2 v-if="!hideTitle" class="px-4 pt-4 text-lg font-bold mb-4 w-full">
      #{{ video.id }} {{ video.title }}
    </h2>
    <p v-if="!hideDescription" class="px-4 whitespace-pre-line text-sm w-full">
      {{ video.description.slice(0, 100) }}
      {{ video.description.length > 100 ? '...' : '' }}
    </p>

    <div v-if="!hideFooter" class="px-4 my-4 w-full text-xs self-end">
      {{ convertNumberToAbbreviatedString(video.viewCount) }} views -
      {{ formatDate(video.publishedAt) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'
import { convertNumberToAbbreviatedString } from '@/compositions/helpers'

export default defineComponent({
  props: {
    video: {
      type: Object,
      required: true,
    },
    hideTitle: {
      type: Boolean,
      default: false,
    },
    hideDescription: {
      type: Boolean,
      default: false,
    },
    hideFooter: {
      type: Boolean,
      default: false,
    },
    imgHeight: {
      type: Number,
      default: 200,
    },
  },
  setup() {
    function convertDuration(duration: string) {
      const [hours, minutes, seconds] = [
        moment.duration(duration).hours(),
        moment.duration(duration).minutes().toString(),
        moment.duration(duration).seconds().toString(),
      ]

      const result = []

      if (hours) {
        result.push(hours)
      }

      if (hours && minutes.length == 1) {
        result.push(`0${minutes}`)
      } else {
        result.push(minutes)
      }

      result.push(seconds.length === 2 ? seconds : `0${seconds}`)

      return result.join(':')
    }

    function formatDate(date: string) {
      return moment(date).fromNow()
    }
    return {
      convertNumberToAbbreviatedString,
      convertDuration,
      formatDate,
    }
  },
})
</script>

<style lang="postcss">
.yt-video {
  @apply flex flex-wrap;
}

.yt-video-time {
  @apply absolute bottom-0 right-0;
  @apply py-1 px-4;
  @apply text-xs;
  @apply mx-2 my-2;
  @apply rounded-sm;
  @apply opacity-80;
  @apply bg-black text-white;
}
</style>
