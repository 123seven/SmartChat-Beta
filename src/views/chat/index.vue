<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  SunIcon,
  MoonIcon,
  ArchiveBoxXMarkIcon,
  StopCircleIcon,
  PaperAirplaneIcon,
  ChevronUpIcon,
  ClockIcon,
  PlusCircleIcon,
  Bars3Icon,
} from '@heroicons/vue/24/outline'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  useAppStore,
  useUserStore,
  useChatStore,
  usePromptStore,
} from '@/store'
import { RightMessage, LeftMessage } from './components'
import { storeToRefs } from 'pinia'
import { Theme } from '@/store/modules/app/helper'
import { useTheme } from '@/hooks/useTheme'
import { useEnterSend } from '@/hooks/useEnterSend'
import { useChat } from './hooks/useChat'
import { useScroll } from './hooks/useScroll'
import { useCopyCode } from './hooks/useCopyCode'
import { useUsingContext } from './hooks/useUsingContext'
import { useRoute, useRouter } from 'vue-router'
import { fetchChatAPIProcess } from '@/api'
import { t } from '@/locales'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { formatDate } from '@/utils/format'

let controller = new AbortController()

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const chatStore = useChatStore()
const appStore = useAppStore()
const { theme } = useTheme()
const { enterSend } = useEnterSend()
useCopyCode()

router.replace({ name: 'Chat', params: { uuid: chatStore.active } })

const { isMobile } = useBasicLayout()
const { addChat, updateChat, updateChatSome, getChatByUuidAndIndex } = useChat()
const { scrollRef, scrollToBottom, scrollToBottomIfAtBottom } = useScroll()
const { usingContext, toggleUsingContext } = useUsingContext()

const { uuid } = route.params as { uuid: string }

const dataSources = computed(() => chatStore.getChatByUuid(uuid))
const currentChatHistory = computed(
  () => chatStore.getChatHistoryByCurrentActive
)

const prompt = ref<string>('')
const inputRef = ref<Ref | null>(null)
const loading = ref<boolean>(false)

// Props
interface Props {
  mobileMenu?: boolean
}
const props = defineProps<Props>()

// Emit
interface Emit {
  (ev: 'changeMenu'): void
}
const emit = defineEmits<Emit>()

// emit 开启/关闭 移动端侧边栏
function handleMobileMenuChange() {
  emit('changeMenu')
}

// 添加PromptStore
const promptStore = usePromptStore()

// 使用storeToRefs，保证store修改后，联想部分能够重新渲染
const { promptList: promptTemplate } = storeToRefs<any>(promptStore)

// 未知原因刷新页面，loading 状态不会重置，手动重置
dataSources.value.forEach((item, index) => {
  if (item.loading) updateChatSome(uuid, index, { loading: false })
})

// 提交对话
function handleSubmit() {
  onConversation()
}

// 对话
async function onConversation() {
  let message = prompt.value
  if (loading.value)
    return
  if (!message || message.trim() === '')
    return
  controller = new AbortController()
  addChat(
    uuid,
    {
      dateTime: new Date().toLocaleString(),
      text: message,
      inversion: true,
      error: false,
      conversationOptions: null,
      requestOptions: { prompt: message, options: null },
    },
  )
  scrollToBottom()
  loading.value = true
  prompt.value = ''
  let options: Chat.ConversationRequest = { cid: uuid }

  if (usingContext.value)
    options.usingContext = true
  addChat(
    uuid,
    {
      dateTime: new Date().toLocaleString(),
      text: '',
      loading: true,
      inversion: false,
      error: false,
      conversationOptions: null,
      requestOptions: { prompt: message, options: { ...options } },
    },
  )
  scrollToBottom()
  try {
    const fetchChatAPIOnce = async () => {
      await fetchChatAPIProcess({
        prompt: message,
        options,
        signal: controller.signal,
        onDownloadProgress: ({ event }) => {
          const xhr = event.target
          const { responseText } = xhr
          try {
            updateChat(
              uuid,
              dataSources.value.length - 1,
              {
                dateTime: new Date().toLocaleString(),
                text: responseText ?? '',
                inversion: false,
                error: false,
                loading: true,
                conversationOptions: null,
                requestOptions: { prompt: message, options: { ...options } },
              },
            )
            scrollToBottomIfAtBottom()
          }
          catch (error) {
            //
          }
        },
      })
      updateChatSome(uuid, dataSources.value.length - 1, { loading: false })
    }
    await fetchChatAPIOnce()
  }
  catch (error: any) {
    const errorMessage = error?.message ?? t('common.wrong')
    if (error.message === 'canceled') {
      updateChatSome(
        uuid,
        dataSources.value.length - 1,
        {
          loading: false,
        },
      )
      scrollToBottomIfAtBottom()
      return
    }
    const currentChat = getChatByUuidAndIndex(uuid, dataSources.value.length - 1)
    if (currentChat?.text && currentChat.text !== '') {
      updateChatSome(
        uuid,
        dataSources.value.length - 1,
        {
          text: `${currentChat.text}\n[${errorMessage}]`,
          error: false,
          loading: false,
        },
      )
      return
    }
    updateChat(
      uuid,
      dataSources.value.length - 1,
      {
        dateTime: new Date().toLocaleString(),
        text: errorMessage,
        inversion: false,
        error: true,
        loading: false,
        conversationOptions: null,
        requestOptions: { prompt: message, options: { ...options } },
      },
    )
    scrollToBottomIfAtBottom()
  }
  finally {
    loading.value = false
  }
}

// 重新生成回答
async function onRegenerate(index: number) {
  if (loading.value)
    return
  controller = new AbortController()
  const { requestOptions } = dataSources.value[index]
  let message = requestOptions?.prompt ?? ''
  let options: Chat.ConversationRequest = { cid: uuid }
  if (requestOptions.options)
    options.usingContext = true
  loading.value = true
  updateChat(
    uuid,
    index,
    {
      dateTime: new Date().toLocaleString(),
      text: '',
      inversion: false,
      error: false,
      loading: true,
      conversationOptions: null,
      requestOptions: { prompt: message, ...options },
    },
  )
  try {
    const fetchChatAPIOnce = async () => {
      await fetchChatAPIProcess({
        prompt: message,
        options,
        signal: controller.signal,
        onDownloadProgress: ({ event }) => {
          const xhr = event.target
          const { responseText } = xhr
          try {
            updateChat(
              uuid,
              index,
              {
                dateTime: new Date().toLocaleString(),
                text: responseText ?? '',
                inversion: false,
                error: false,
                loading: true,
                conversationOptions: null,
                requestOptions: { prompt: message, ...options },
              },
            )
          }
          catch (error) {
            //
          }
        },
      })
      updateChatSome(uuid, index, { loading: false })
    }
    await fetchChatAPIOnce()
  }
  catch (error: any) {
    if (error.message === 'canceled') {
      updateChatSome(
        uuid,
        index,
        {
          loading: false,
        },
      )
      return
    }
    const errorMessage = error?.message ?? t('common.wrong')
    updateChat(
      uuid,
      index,
      {
        dateTime: new Date().toLocaleString(),
        text: errorMessage,
        inversion: false,
        error: true,
        loading: false,
        conversationOptions: null,
        requestOptions: { prompt: message, ...options },
      },
    )
  }
  finally {
    loading.value = false
  }
}

// 删除回答
function handleDelete(index: number) {
  if (loading.value) return
  ElMessageBox.confirm(
    t('chat.deleteMessageConfirm'),
    t('chat.deleteMessage'),
    {
      confirmButtonText: t('common.yes'),
      cancelButtonText: t('common.no'),
      type: 'warning',
    }
  ).then(() => {
    chatStore.deleteChatByUuid(uuid, index)
    ElMessage({
      type: 'success',
      message: 'Delete completed',
    })
  })
}

// 清空记录
function handleClear() {
  if (loading.value) return

  ElMessageBox.confirm(t('chat.clearChatConfirm'), t('chat.clearChat'), {
    confirmButtonText: t('common.yes'),
    cancelButtonText: t('common.no'),
    type: 'warning',
  })
    .then(() => {
      chatStore.clearChatByUuid(uuid)
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

// 回车发送消息
function handleEnter(event: KeyboardEvent) {
  if (loading.value) return

  console.log('handleEnter')
  console.log('enterSend.value', enterSend.value)
  // 禁止回车发送消息
  if (!enterSend.value) {
    return
  }
  if (!isMobile.value) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  } else {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault()
      handleSubmit()
    }
  }
}

// TODO 展示Prompt选择框
function handlePrompt() { }

// 允许/禁止回车发送消息
function changeEnterSend() {
  appStore.setUseEnter()

  if (enterSend.value) ElMessage.success('已开启回车按钮发送消息')
  else ElMessage.warning('已禁止回车按钮发送消息')
}

// 禁止发送按钮
const buttonDisabled = computed(() => {
  return loading.value || !prompt.value || prompt.value.trim() === ''
})

// 停止响应
function handleStop() {
  if (loading.value) {
    controller.abort()
    loading.value = false
  }
}

// 修改主题
function changeTheme(theme: Theme) {
  // set Theme to localStorage
  console.log('change theme:', theme)
  appStore.setTheme(theme)
}

onMounted(() => {
  scrollToBottom()
  if (inputRef.value) inputRef.value?.focus()
})

onUnmounted(() => {
  if (loading.value) controller.abort()
})
</script>

<template>
  <!-- title -->
  <div class="flex-shrink-0">
    <div class="flex flex-row justify-between px-4 py-5 sm:px-6">
      <div>
        <h3 class="text-base font-semibold leading-6 dark:text-gray-200">
          {{
            currentChatHistory?.title ? (
            currentChatHistory.title.length > 16 ? currentChatHistory.title.slice(0, 16) +
              '...' : currentChatHistory.title
          ) : 'New Chat'
          }}
        </h3>

        <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          {{ dataSources.length }} Messages
          {{ dataSources[0] ? formatDate(dataSources[0].dateTime) : '' }}
        </p>
      </div>

      <div class="self-center">
        <!-- 主题修改 -->
        <button v-if="theme === 'light'" @click="changeTheme('dark')" type="button"
          class="inline-flex items-center rounded-full border border-transparent bg-black p-2 text-white shadow-sm">
          <MoonIcon class="h-5 w-5" aria-hidden="true" />
        </button>

        <button v-else @click="changeTheme('light')" type="button"
          class="inline-flex items-center rounded-full border border-transparent bg-white p-2 text-black shadow-sm">
          <SunIcon class="h-5 w-5" aria-hidden="true"></SunIcon>
        </button>

        <!-- 清空聊天记录 -->
        <el-tooltip content="清空聊天记录" placement="bottom" effect="light">
          <button @click="handleClear" type="button"
            class="ml-2 inline-flex items-center rounded-full border border-transparent bg-red-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <ArchiveBoxXMarkIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </el-tooltip>

        <!-- 手机展示侧边栏 -->
        <button v-if="isMobile" @click="handleMobileMenuChange" type="button"
          class="ml-2 inline-flex items-center rounded-full border border-transparent p-2 text-gray-700 shadow-sm dark:bg-[#161618]">
          <Bars3Icon class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>

  <!-- messages -->
  <div id="scrollRef" ref="scrollRef" class="flex-grow overflow-y-scroll">
    <div class="grid grid-cols-12 gap-y-2">
      <template v-for="(item, index) of dataSources" :key="index">
        <RightMessage v-if="item.inversion" :id="index.toString()" :content="item.text"
          :avatar-url="userStore.userInfo.avatar"></RightMessage>

        <LeftMessage v-else :id="index.toString()" :content="item.text" :inversion="item.inversion" :error="item.error" :isMobile="isMobile">
        </LeftMessage>
      </template>
    </div>
  </div>

  <div class="flex-shrink-0">
    <!-- stop button -->
    <div v-if="loading" class="flex justify-center">
      <button @click="handleStop"
        class="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
        <svg class="animate-spin w-5 h-5 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
            clip-rule="evenodd" />
        </svg>
        <span class="mx-1">{{ $t('chat.StopResponding') }}</span>
      </button>
    </div>
    <!-- message input  -->
    <div class="lg:inset-x-64 lg:-right-0 inset-x-0">
      <div class="relative flex items-center my-5 mx-5">
        <!-- 是否允许回车发送 -->
        <el-tooltip v-if="!isMobile" :content="!enterSend ? '允许回车发送' : '禁止回车发送'" placement="bottom" effect="light">
          <div class="absolute right-28 focus:outline-none rtl:left-0 rtl:right-auto">
            <ChevronUpIcon class="w-6 h-6 mx-4" @click="changeEnterSend" :class="[
              !enterSend
                ? 'text-gray-400 dark:text-gray-500'
                : 'text-gray-700 dark:text-gray-100',
            ]"></ChevronUpIcon>
          </div>
        </el-tooltip>

        <!-- Promtp提示 -->
        <el-tooltip v-if="!isMobile" content="选择Prompt" placement="bottom" effect="light">
          <div class="absolute right-20 focus:outline-none rtl:left-0 rtl:right-auto">
            <PlusCircleIcon @click="handlePrompt" class="w-6 h-6 mx-4 text-gray-700 dark:text-gray-100"></PlusCircleIcon>
          </div>
        </el-tooltip>

        <!-- 是否需要携带聊天历史信息 -->
        <el-tooltip :content="!usingContext ? '使用连续对话模式' : '关闭连续对话模式'" placement="bottom" effect="light">
          <div class="absolute right-12 focus:outline-none rtl:left-0 rtl:right-auto">
            <ClockIcon class="w-6 h-6 mx-4" @click="toggleUsingContext" :class="[
              !usingContext
                ? 'text-gray-400 dark:text-gray-500'
                : 'text-gray-700 dark:text-gray-100',
            ]"></ClockIcon>
          </div>
        </el-tooltip>

        <!-- 发送消息 -->
        <button :disabled="buttonDisabled" @click="handleSubmit" type="submit"
          class="border-l border-gray-300 absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto">
          <PaperAirplaneIcon class="w-6 h-6 mx-4 transition-colors duration-300" :class="[
            buttonDisabled
              ? 'text-gray-400 dark:text-gray-500'
              : 'text-gray-700 dark:text-gray-100',
          ]" aria-hidden="true"></PaperAirplaneIcon>
        </button>

        <!-- 输入框 -->
        <input ref="inputRef" v-model="prompt" @keypress="handleEnter" type="text"
          class="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 border rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 dark:bg-[#161618] dark:text-gray-300 dark:border-[#10b982]" />
      </div>
    </div>
  </div>
</template>
