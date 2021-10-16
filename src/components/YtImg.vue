<template>
  <img class="responsive-img" :style="style" :src="src" :alt="alt" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    src: {
      type: String,
      default: null,
    },
    alt: {
      type: String,
      default: '',
    },
    height: {
      type: [String, Number],
      default: 'auto',
    },
  },
  setup(props) {
    const style = {
      height: typeof props.height === 'number' ? `${props.height}px` : props.height,
    }

    return {
      style,
    }
  },
})
</script>
