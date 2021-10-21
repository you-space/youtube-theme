import { createApp } from 'vue'
import Settings from './admin/Settings.vue'
import space from 'space'

export async function mount(element: HTMLElement) {
  const css = await space.emit('youtube-theme:admin-css')

  const style = document.createElement('style')

  style.innerHTML = css

  element.id = 'youtube-theme'

  document.querySelector('head')?.appendChild(style)

  const app = createApp(Settings)

  app.mount(element)
}
