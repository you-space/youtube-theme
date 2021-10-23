<template>
  <label :class="['yt-input']" v-bind="$attrs">
    <div v-if="label" :class="`text-${innerColor} mb-2 font-bold`">{{ label }}</div>

    <input
      v-model="model"
      :class="`border-${innerColor} focus:border-${innerFocusColor}`"
      @change="validate"
    />

    <template v-if="message">
      <div :class="`text-${innerColor}`" class="my-2">
        {{ message }}
      </div>
    </template>
  </label>
</template>
<script lang="ts">
import { useModel } from '@/compositions/helpers'
import { defineComponent, inject, PropType, Ref, ref } from 'vue'
import { YtFormInput } from './YtForm.vue'

interface Rule {
  (value: any): boolean | string
}

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    rules: {
      type: Array as PropType<Rule[]>,
      default: () => [],
    },
    color: {
      type: String,
      default: 'gray-500',
    },
    focusColor: {
      type: String,
      default: 'gray-800',
    },
  },
  setup(props, { emit }) {
    const inputs = inject<Ref<YtFormInput[]>>('form:inputs')
    const model = useModel(props, 'modelValue', emit)

    const message = ref('')
    const innerColor = ref(props.color)
    const innerFocusColor = ref(props.focusColor)

    function validate() {
      const result = props.rules.reduce<string | boolean>(
        (result, rule) => (result !== true ? result : rule(model.value)),
        true
      )

      if (typeof result === 'boolean') {
        message.value = ''
        innerColor.value = props.color
        innerFocusColor.value = props.focusColor
        return result
      }

      message.value = result
      innerColor.value = 'red-500'
      innerFocusColor.value = 'red-500'

      return result
    }

    if (inputs && inputs.value) {
      inputs.value.push({
        validate,
      })
    }

    return {
      message,
      model,
      innerColor,
      innerFocusColor,

      validate,
    }
  },
})
</script>
<style lang="postcss">
.yt-input {
  @apply flex flex-wrap;
}

.yt-input input {
  @apply focus:outline-none;
  @apply w-full rounded px-4 py-2;
  @apply border border-gray-500;
  @apply dark:focus:bg-gray-500 dark:bg-gray-700 dark:text-white dark:border-gray-700;
  @apply transition-colors;
}
</style>
