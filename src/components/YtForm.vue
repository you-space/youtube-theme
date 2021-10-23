<template>
  <form @submit.prevent="submit">
    <slot />
  </form>
</template>
<script lang="ts">
import { defineComponent, ref, provide } from 'vue'

export interface YtFormInput {
  validate: () => boolean | string
}

export default defineComponent({
  emits: ['submit'],
  setup(props, { emit }) {
    const inputs = ref<YtFormInput[]>([])

    provide('form:inputs', inputs)

    function submit() {
      const isValid = inputs.value.every((input) => input.validate() === true)

      console.log(isValid)

      if (isValid) {
        emit('submit')
      }
    }

    return {
      submit,
    }
  },
})
</script>
