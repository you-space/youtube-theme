<template>
  <div ref="element" class="h-full overflow-auto" @scroll="scroll">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['start', 'end'],
  setup(props, { emit }) {
    const element = ref<HTMLElement>()
    const isEnd = ref(false)
    emit('start')
    watch(
      () => isEnd.value,
      (value) => {
        if (value && !props.disable) {
          emit('end')
        }
      }
    )

    function scroll() {
      if (!element.value) return
      const { scrollHeight, scrollTop, clientHeight } = element.value
      isEnd.value = scrollHeight - scrollTop === clientHeight
    }

    return {
      element,
      scroll,
    }
  },
})
</script>
