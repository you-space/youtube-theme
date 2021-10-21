<template>
  <div class="px-4">
    <h2 style="margin-top: 0">Slide</h2>

    <y-form @submit="save">
      <y-toggle v-model="enable" filled label="Enable slide" class="q-mb-md" />
      <y-input v-model="ids" filled label="Video ids" class="q-mb-md" />

      <y-btn type="submit" label="submit" :loading="loading" />
    </y-form>
  </div>
</template>
<script>
import space from 'space'
import { ref, inject } from 'vue'

export default {
  setup() {
    const ids = ref('')
    const enable = ref(false)
    const loading = ref(false)
    const notify = inject('notify')

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
          notify.create('Settings updated')
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
