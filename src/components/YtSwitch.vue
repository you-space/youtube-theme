<template>
  <label class="flex items-center">
    <div class="yt-switch" :style="`--size:${size}px`">
      <input v-model="model" type="checkbox" />
      <span class="slider round"></span>
    </div>
    <div
      v-if="label"
      :style="`font-size:${size / 3}px;`"
      :class="`text-${innerColor} ml-2 font-bold`"
    >
      {{ label }}
    </div>
  </label>
</template>
<script lang="ts">
import { useModel } from '@/compositions/helpers'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 40,
    },
    color: {
      type: String,
      default: 'gray-500',
    },
  },
  setup(props, { emit }) {
    const model = useModel<boolean>(props, 'modelValue', emit)

    const innerColor = ref(props.color)

    return {
      model,
      innerColor,
    }
  },
})
</script>

<style lang="postcss">
/* The switch - the box around the slider */
.yt-switch {
  @apply relative inline-block;
  --size: 60px;
  --height: calc(var(--size) * 0.5667);
  --dot-height: calc(var(--height) * 0.765);
  width: var(--size);
  height: var(--height);
}

/* Hide default HTML checkbox */
.yt-switch input {
  @apply opacity-0 w-0 h-0;
}

/* The slider */
.yt-switch .slider {
  @apply absolute inset-0;
  @apply cursor-pointer;
  @apply transition-all ease-in-out;
  background-color: #ccc;
}

.yt-switch .slider:before {
  @apply absolute;
  @apply transition-all ease-in-out;
  content: '';
  height: var(--dot-height);
  width: var(--dot-height);
  left: calc(var(--dot-height) * 0.15);
  bottom: calc(var(--dot-height) * 0.15);
  background-color: white;
}

.yt-switch input:checked + .slider {
  background-color: #2196f3;
}

.yt-switch input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

.yt-switch input:checked + .slider:before {
  transform: translateX(var(--dot-height));
}

/* Rounded sliders */
.yt-switch .slider.round {
  border-radius: var(--height);
}

.yt-switch .slider.round:before {
  border-radius: 50%;
}
</style>
