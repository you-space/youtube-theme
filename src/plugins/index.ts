import { AppContext } from '../types'
const plugins = import.meta.glob('./*.ts')

export async function boot(ctx: AppContext) {
  await Promise.all(
    Object.entries(plugins).map(async ([, value]) => {
      const plugin = await value()

      if (!plugin || !plugin.default) {
        return
      }

      const pluginBoot = plugin.default

      await pluginBoot(ctx)
    })
  )
}
