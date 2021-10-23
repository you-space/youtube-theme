import { createApp } from 'vue'
import Settings from './admin/Settings.vue'
import gc from './plugins/global-components'
import space from 'space'

export async function mount(element: HTMLElement) {
  const css = await space.emit('youtube-theme:admin-css')

  const style = document.createElement('style')

  style.innerHTML = css

  element.id = 'youtube-theme'

  document.querySelector('head')?.appendChild(style)

  const app = createApp(Settings)

  gc({ app })

  app.mount(element)
}
