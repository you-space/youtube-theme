import { computed } from 'vue'

export function convertNumberToPixel(value: number) {
  if (typeof value === 'string') {
    return value
  }

  return `${value}px`
}

interface EmitFn {
  (event: string, ...args: any[]): void
}

export function useModel<T = any>(props: Record<string, any>, name: string, emit: EmitFn) {
  return computed<T>({
    get() {
      return props[name]
    },
    set(value) {
      emit(`update:${name}`, value)
    },
  })
}
