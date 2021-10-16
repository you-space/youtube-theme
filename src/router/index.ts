import { createRouter as baseCreateRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

export function createRouter() {
  const router = baseCreateRouter({
    history: createWebHistory(),
    routes,
  })

  return router
}

export default createRouter
