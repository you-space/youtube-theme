<template>
  <div class="yt-drawer" :style="style">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, Ref, watch, ref } from 'vue'
import { convertNumberToPixel } from '../compositions/helpers'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: true,
    },
    width: {
      type: Number,
      default: 300,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const drawer = inject<Ref>('layout:drawer')
    const innerWidth = ref(props.width)

    const model = computed({
      get: () => {
        return props.modelValue
      },
      set: (value) => {
        emit('update:modelValue', value)
      },
    })

    const style = computed(() => {
      return {
        opacity: !model.value ? 0 : 1,
        height: convertNumberToPixel(drawer?.value.height || '100%'),
        width: convertNumberToPixel(innerWidth.value),
      }
    })

    function setSizes() {
      if (!drawer?.value) return

      drawer.value.width = innerWidth.value
    }

    watch(() => innerWidth.value, setSizes, {
      immediate: true,
    })

    watch(
      () => model.value,
      (value) => {
        innerWidth.value = value ? props.width : 1
      }
    )

    return {
      style,
      innerWidth,
    }
  },
})
</script>

<style lang="postcss">
.yt-drawer {
  @apply transition-all ease-in-out border-r;
}
</style>
