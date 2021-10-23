<template>
  <div class="flex">
    <div class="w-6/12">
      <h2 class="mt-0 mb-4 text-4xl font-bold">Slide</h2>

      <yt-form @submit="save">
        <yt-switch v-model="enable" label="Enable slide" class="mb-4" />
        <yt-input v-model="ids" :rules="[rules.required]" label="Videos" class="mb-4" />

        <yt-btn type="submit" label="submit" :loading="loading" />
      </yt-form>
    </div>
  </div>
</template>
<script lang="ts">
import space from 'space'
import { ref } from 'vue'

export default {
  setup() {
    const ids = ref('')
    const enable = ref(false)
    const loading = ref(false)
    const rules = {
      required: (value: string) => !!value || 'Field required',
    }

    const metaName = 'youtube-theme:settings:slide'

    async function setSettings() {
      const settings = await space.emit('meta:show', metaName)

      if (settings) {
        enable.value = settings.enable
        ids.value = settings.ids.join()
      }
    }

    setSettings()

    async function save() {
      loading.value = true

      const data = {
        name: metaName,
        value: {
          enable: enable.value,
          ids: ids.value.split(','),
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

      loading.value = false
    }

    return {
      ids,
      enable,
      rules,
      loading,
      save,
    }
  },
}
</script>
<style lang="postcss">
@tailwind components;
@tailwind utilities;
</style>
