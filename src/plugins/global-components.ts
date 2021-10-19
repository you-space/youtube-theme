import { AppContext } from '../types'

export default function boot({ app }: AppContext) {
  const components = import.meta.globEager('../components/*.vue')
  const layouts = import.meta.globEager('../layouts/*.vue')

  Object.entries(components)
    .concat(Object.entries(layouts))
    .forEach(([key, component]) => {
      const name = key
        .replace('../components/', '')
        .replace('../layouts/', 'Layout')
        .replace('.vue', '')

      app.component(name, component.default || component)
    })
}
