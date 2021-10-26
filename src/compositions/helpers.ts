import { computed, SetupContext } from 'vue'

export function convertNumberToPixel(value: number) {
  if (typeof value === 'string') {
    return value
  }

  return `${value}px`
}

export function useModel<T = any>(props: Record<string, any>, name: string, emit: any) {
  return computed<T>({
    get() {
      return props[name] as any
    },
    set(value) {
      emit(`update:${name}`, value)
    },
  })
}

export function convertNumberToAbbreviatedString(n: number) {
  if (n < 1e3) return n
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K'
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M'
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B'
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T'
}
