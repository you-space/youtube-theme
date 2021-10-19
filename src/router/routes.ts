import { RouteRecordRaw } from 'vue-router'
import { kebabCase } from 'lodash'

const components = import.meta.glob('../pages/**/*.vue')

const pages = Object.entries(components)
  .filter(([filename]) => filename.split('/').pop()?.charAt(0) !== '-')
  .map(([filename, component]) => {
    const path = filename
      .replace('../pages', '')
      .replace(/index/i, '')
      .replace('.vue', '')
      .toLowerCase()

    return {
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
