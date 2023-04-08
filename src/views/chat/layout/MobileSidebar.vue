
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  Popover,
} from '@headlessui/vue'
import {
  Bars3Icon,
  CursorArrowRaysIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { useUserStore, useAuthStore } from '@/store'

const route = useRoute()
const userStore = useUserStore()
const authStore = useAuthStore()

// Props
interface Props {
  mobileMenu?: boolean
  showNav?: boolean
}
const props = defineProps<Props>()

// Emit
interface Emit {
  (ev: 'changeMenu'): void
}
const emit = defineEmits<Emit>()


// emit 开启/关闭
function handleMenuChange() {
  emit('changeMenu')
}

// 导航栏
const navigation = computed(() => {
  const navigation = [
    // { name: 'Dashboard', icon: HomeIcon, href: '#', current: false },
    {
      name: 'chat',

      href: '/chat',
      pathName: 'Chat',

    },
    {
        name: 'apps',
        href: '/chat/apps',
        pathName: 'Apps',
    }
  ]
  if (userStore.userInfo.auth) {
    navigation.push(
      {
        name: 'upgrade',
        href: '/chat/upgrade',
        pathName: 'Upgrade',
      },
      {
        name: 'members',
        href: '/chat/members',
        pathName: 'Members',
      }
    )
  }
  return navigation
})

// 用户登出
function handleSignOut() {
  console.log('user Sign Out:', userStore.userInfo.id)
  authStore.removeToken()
  userStore.resetUserInfo()
}
</script>

<template>
  <header class="bg-white md:hidden dark:bg-[#161618]">
    <nav v-if="props.showNav" class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <!-- 图标 -->
      <div class="flex lg:flex-1">
        <span class="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          {{ $t('common.productName') }}
        </span>
      </div>
      <!-- 是否打开移动端侧边栏 -->
      <div @click="handleMenuChange" class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

    </nav>
    <!-- 移动端侧边栏 -->
    <Dialog as="div" class="lg:hidden" @close="handleMenuChange" :open="props.mobileMenu">
      <div class="fixed inset-0 z-10"></div>
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-[#161618] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <span class="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            {{ $t('common.productName') }}
          </span>

          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="handleMenuChange">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">

              <!-- 导航栏 -->
              <router-link v-for="item in navigation" :key="item.name" :to="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100  dark:text-white dark:hover:bg-gray-800"
                :class="[
                  route.name === item.pathName
                    ? 'bg-gray-100 dark:bg-gray-800'
                    : '',
                ]">{{$t(`common.${item.name}`) }}

              </router-link>

            </div>
            <div class="py-6">
              <div v-if="userStore.userInfo.auth" @click="handleSignOut"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white">
                {{ $t(`common.signout`) }}
              </div>
              <router-link v-else to="/signin"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white">
                {{ $t(`common.signin`) }}
              </router-link>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>
