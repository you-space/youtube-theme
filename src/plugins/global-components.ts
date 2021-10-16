import { AppContext } from '../types'

export default function boot({ app }: AppContext) {
  const components = import.meta.globEager('../components/*.vue')

  Object.entries(components).forEach(([key, component]) => {
    const name = key.replace('../components/', '').replace('.vue', '')

    app.component(name, component.default || component)
  })
}
