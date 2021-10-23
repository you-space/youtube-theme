import { AppContext } from '../types'

interface Options {
  include: string[]
}

export default function boot({ app }: Pick<AppContext, 'app'>, options?: Options) {
  const files = import.meta.globEager('../components/*.vue')
  const layouts = import.meta.globEager('../layouts/*.vue')

  const components = Object.entries(files)
    .concat(Object.entries(layouts))
    .map(([key, component]) => {
      const name = key
        .replace('../components/', '')
        .replace('../layouts/', 'Layout')
        .replace('.vue', '')

      return { name, component }
    })

  components
    .filter(({ name }) => !options?.include || options.include.includes(name))
    .forEach(({ name, component }) => {
      app.component(name, component.default || component)
    })
}
