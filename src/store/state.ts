interface SlideItem {
  id?: string
  type: string
}

const state = {
  dark: false,
  slide: {
    enable: false,
    items: [] as SlideItem[],
  },
}

export type RootState = typeof state

export default state
