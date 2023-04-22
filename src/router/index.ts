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
        meta: {
          title: 'Chat',
        },
      },
      {
        path: '/chat/settings',
        name: 'Settings',
        component: () => import('@/views/chat/Settings.vue'),
        meta: {
          title: 'Settings',
        },
      },
      {
        path: '/chat/upgrade',
        name: 'Upgrade',
        component: () => import('@/views/chat/Upgrade.vue'),
        meta: {
          title: 'Upgrade',
        },
      },
      {
        path: '/chat/members',
        name: 'Members',
        component: () => import('@/views/chat/Members.vue'),
        meta: {
          title: 'Members',
        },
      },
      {
        path: '/chat/apps',
        name: 'Apps',
        component: () => import('@/views/chat/Apps.vue'),
        meta: {
          title: 'Apps',
        },
      },
      {
        path: '/chat/apps/:appId',
        name: 'AppInfo',
        component: () => import('@/views/chat/AppInfo.vue'),
        meta: {
          title: 'AppInfo',
        },
      },
    ],
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@/views/auth/Signin.vue'),
    meta: {
      title: 'SignIn',
    },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/auth/Signup.vue'),
    meta: {
      title: 'SignUp',
    },
  },
  {
    path: '/oauth',
    name: 'Oauth',
    component: () => import('@/views/auth/Oauth.vue'),
    meta: {
      title: 'Oauth',
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/400.vue'),
    meta: {
      title: '404',
    },
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/exception/500.vue'),
    meta: {
      title: '500',
    },
  },
  {
    path: '/disclaimer',
    name: 'Disclaimer',
    component: () => import('@/views/Disclaimer.vue'),
    meta: {
      title: '免责声明',
    },
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
