<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Cog8ToothIcon,
  UsersIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  XCircleIcon,
  ArrowLeftOnRectangleIcon,
  SquaresPlusIcon,
  ArrowUpCircleIcon
} from '@heroicons/vue/24/outline'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore, useChatStore, useAuthStore } from '@/store'
import { v4 as uuidv4 } from 'uuid'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const chatStore = useChatStore()
const authStore = useAuthStore()
const dataSources = computed(() => chatStore.history)

const showDeleteIndex = ref<number>()

// 导航栏
const navigation = computed(() => {
  const navigation = [
    // { name: 'Dashboard', icon: HomeIcon, href: '#', current: false },
    {
      name: 'chat',
      icon: ChatBubbleOvalLeftEllipsisIcon,
      href: '/chat',
      pathName: 'Chat',

    },
  ]
  if (userStore.userInfo.auth) {
    navigation.push(
      {
        name: 'settings',
        icon: Cog8ToothIcon,
        href: '/chat/settings',
        pathName: 'Settings',
      },
      {
        name: 'upgrade',
        icon: ArrowUpCircleIcon,
        href: '/chat/upgrade',
        pathName: 'Upgrade',
      },
      {
        name: 'members',
        icon: UsersIcon,
        href: '/chat/members',
        pathName: 'Members',
      },
      {
        name: 'apps',
        icon: SquaresPlusIcon,
        href: '/chat/apps',
        pathName: 'Spps',
      }
    )
  }
  return navigation
})

// 新建对话
function handleAdd() {
  // 主页面最多只显示最近5条对话记录
  if (chatStore.history.length === 5) {
    console.log('delete local last chat history...')
    chatStore.deleteHistory(4)
  }
  chatStore.addHistory({
    title: 'New Chat',
    uuid: uuidv4().replace(/-/g, ''),
    isEdit: false,
  })
}

// 选择对话
async function handleSelect({ uuid }: Chat.History) {
  if (isActive(uuid)) return

  if (chatStore.active)
    chatStore.updateHistory(chatStore.active, { isEdit: false })
  await chatStore.setActive(uuid)
}

// 修改对话
function handleEdit(
  { uuid }: Chat.History,
  isEdit: boolean,
  event?: MouseEvent
) {
  event?.stopPropagation()
  chatStore.updateHistory(uuid, { isEdit })
}

// 展示删除图片
function showDelete(index: number) {
  if (index === showDeleteIndex.value) {
    showDeleteIndex.value = undefined
  } else {
    showDeleteIndex.value = index
  }
}

// 删除对话
function handleDelete(index: number, event?: MouseEvent | TouchEvent) {
  event?.stopPropagation()
  chatStore.deleteHistory(index)
}

// TODO 更新对话-暂未使用
function handleEnter(
  { uuid }: Chat.History,
  isEdit: boolean,
  event: KeyboardEvent
) {
  event?.stopPropagation()
  if (event.key === 'Enter') chatStore.updateHistory(uuid, { isEdit })
}

// 显示当前正在使用的对话
function isActive(uuid: string) {
  return chatStore.active === uuid
}

// 用户登出
function handleSignOut() {
  console.log('user Sign Out', userStore.userInfo.id)
  authStore.removeToken()
  userStore.resetUserInfo()
}

// 跳转至-登录页面
function handleSignIn() {
  console.log('user Sign In')
  router.push({ name: 'SignIn' })
}

// 对话记录图标
const bgColorList = [
  'bg-pink-500',
  'bg-slate-500',
  'bg-indigo-500',
  'bg-blue-500',
  'bg-yellow-500',
]
</script>

<template>
  <div
    class="flex flex-col w-64 h-screen px-5 py-6 border-r rtl:border-r-0 rtl:border-l dark:bg-[#161618] dark:border-gray-700"
  >
    <!-- logo -->
    <div class="flex flex-shrink-0 items-center">
      <span
        class="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
      >
        {{ $t('common.productName') }}
      </span>
      <span
        class="bg-[#9750dd] text-white rounded ml-1 px-1 text-sm font-bold leading-none"
        >BETA</span
      >
    </div>

    <div class="flex flex-col justify-between flex-1 mt-6">
      <!-- navigation -->
      <nav class="-mx-3 space-y-3">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
          :class="[
            route.name === item.pathName
              ? 'bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-gray-700'
              : '',
          ]"
        >
          <component :is="item.icon" class="w-5 h-5"></component>
          <span class="mx-2 text-sm font-medium">{{
            $t(`common.${item.name}`)
          }}</span>
        </router-link>
      </nav>

      <!-- chat record -->
      <div>
        <div class="flex items-center justify-between">
          <h2 class="text-base font-semibold text-gray-800 dark:text-white">
            {{ $t('common.chats') }}
          </h2>
          <button
            @click="handleAdd"
            class="p-0.5 hover:bg-gray-100 duration-200 transition-colors text-gray-500 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 border rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>

        <nav class="mt-4 -mx-3 space-y-3">
          <button
            @click="handleSelect(item)"
            v-for="(item, index) of dataSources"
            :key="index"
            class="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300"
            :class="[
              isActive(item.uuid)
                ? 'bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-gray-700'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700',
            ]"
          >
            <XCircleIcon
              @click="handleDelete(index, $event)"
              v-if="showDeleteIndex === index"
              class="w-4 h-4 text-red-600 mr-3"
            ></XCircleIcon>
            <div class="flex items-center gap-x-2">
              <span
                class="w-2 h-2 rounded-full"
                :class="[bgColorList[index]]"
              ></span>
              <span class="line-clamp-1 after:content-ellipsis after:ml-1">{{
                item.title.length > 12
                  ? item.title.slice(0, 12) + '...'
                  : item.title
              }}</span>
            </div>
            <svg
              @click="showDelete(index)"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 rtl:rotate-180"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>

    <!-- user info -->
    <div
      v-if="userStore.userInfo.auth"
      class="flex items-center justify-between mt-8"
    >
      <div class="flex items-center gap-x-2">
        <img
          class="object-cover rounded-full h-7 w-7"
          :src="userStore.userInfo.avatar"
          alt="avatar"
        />
        <span class="text-sm font-medium text-gray-700 dark:text-gray-200">{{
          userStore.userInfo.username || userStore.userInfo.email
        }}</span>
      </div>

      <!-- 退出登录 -->
      <el-tooltip content="退出登录" placement="bottom">
        <div
          @click="handleSignOut"
          class="text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </div>
      </el-tooltip>
    </div>

    <div v-else class="flex items-center justify-between mt-8">
      <el-tooltip content="登录" placement="bottom">
        <ArrowLeftOnRectangleIcon
          @click="handleSignIn"
          class="w-5 h-5 text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400"
        ></ArrowLeftOnRectangleIcon>
      </el-tooltip>
    </div>
  </div>
</template>
