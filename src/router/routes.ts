import { RouteRecordRaw } from 'vue-router'
import { kebabCase } from 'lodash'

const components = import.meta.glob('../pages/**/*.vue')

const pages = Object.entries(components).map(([filename, component]) => {
  const name = filename
    .replace('../pages/', '')
    .replace(/\/index.vue/i, '')
    .replace('.vue', '')
    .toLowerCase()

  const path = kebabCase(name)

  return {
    name,
    path,
    component,
  }
})

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    children: pages,
  },
]
