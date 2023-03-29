import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { setupPageGuard } from './permission'
import { ChatLayout } from '@/views/chat/layout'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    component: ChatLayout,
    redirect: '/chat',
    children: [
      {
        path: '/chat/:uuid?',
        name: 'Chat',
        component: () => import('@/views/chat/index.vue'),
      },
      {
        path: '/chat/settings',
        name: 'Settings',
        component: () => import('@/views/chat/Settings.vue'),
      },
      {
        path: '/chat/members',
        name: 'Members',
        component: () => import('@/views/chat/Members.vue'),
      },
      {
        path: '/chat/apps',
        name: 'Apps',
        component: () => import('@/views/chat/Apps.vue'),
      },
    ],
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@/views/auth/Signin.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/auth/Signup.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/400.vue'),
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/exception/500.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/404',
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

setupPageGuard(router)

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}
