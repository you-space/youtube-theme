<template>
  <yt-input v-model="innerSearch" v-bind="inputAttrs" class="yt-autocomplete">
    <div v-if="model" class="absolute inset-0 flex items-center px-3">
      <yt-chip> {{ getLabel(model) }} </yt-chip>
      <div class="flex-1"></div>
      <yt-icon class="cursor-pointer" name="close" @click="model = null" />
    </div>

    <div v-show="showMenu" class="yt-autocomplete-items">
      <yt-list>
        <yt-item v-if="!items.length" tabindex="0"> No items </yt-item>
        <template v-for="(item, index) in items" :key="index">
          <slot name="item" :item="item" :select="() => select(item)">
            <yt-item clickable :class="index !== 5 ? 'border-b' : ''" @click.stop="select(item)">
              {{ getLabel(item) }}
            </yt-item>
          </slot>
        </template>
      </yt-list>
    </div>
  </yt-input>
</template>
<script lang="ts">
import { useModel } from '@/compositions/helpers'
import { defineComponent, ref, watch } from 'vue'
import { pick } from 'lodash'

export default defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Object, Array],
      default: '',
    },
    search: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
    itemLabel: {
      type: String,
      default: 'label',
    },
    itemValue: {
      type: String,
      default: 'value',
    },
  },
  setup(props, { emit, attrs }) {
    const model = useModel(props, 'modelValue', emit)
    const innerSearch = useModel(props, 'search', emit)
    const showMenu = ref(false)

    const inputAttrs: any = pick(attrs, ['placeholder', 'type', 'name', 'id', 'class'])

    function getLabel(item: Record<string, any>) {
      if (typeof item === 'string') {
        return item
      }
      return item[props.itemLabel] || 'undefined'
    }

    function select(item: any) {
      model.value = item
      innerSearch.value = ''
    }

    watch(
      () => innerSearch.value,
      () => (showMenu.value = innerSearch.value.length > 0)
    )

    inputAttrs.onBlur = () => setTimeout(() => (showMenu.value = false), 500)

    return {
      model,
      showMenu,
      innerSearch,
      inputAttrs,

      getLabel,
      select,
    }
  },
})
</script>
<style lang="scss">
.yt-autocomplete {
  @apply relative;

  .yt-autocomplete-items {
    @apply absolute top-full  z-10;
    @apply w-full max-h-80 overflow-auto;
    @apply bg-white dark:bg-gray-700;
    @apply border dark:border-gray-900;
  }
}
</style>
