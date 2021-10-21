import { AppContext } from '../types'
const plugins = import.meta.glob('./*.ts')

export async function boot(ctx: Partial<AppContext>, filter?: string[]) {
  await Promise.all(
    Object.entries(plugins)
      .filter(([key]) => !filter || filter.includes(key.replace('.ts', '').replace('./', '')))
      .map(async ([, value]) => {
        const plugin = await value()

        if (!plugin || !plugin.default) {
          return
        }

        const pluginBoot = plugin.default

        await pluginBoot(ctx)
      })
  )
}
