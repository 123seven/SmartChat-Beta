<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ModelSelect } from '@/components'
import { fetchUserSettings, saveUserSettings } from '@/api'
import {
  EyeIcon,
  KeyIcon,
  UserIcon,
  UserGroupIcon,
} from '@heroicons/vue/20/solid'
import { ElDialog, ElMessage } from 'element-plus'
import { useUserStore } from '@/store'
import { t } from '@/locales'

const userStore = useUserStore()

const loading = ref(false)
const showAvatarDialogVisible = ref(false)
const subscription = ref(0)

interface UserSettings {
  id: string
  avatar: string
  username: string
  email: string
  apiKey: string
  modelId: number
}
const userInfo = ref<UserSettings>({
  id: '',
  avatar: 'https://files.catbox.moe/tyr8zm.png',
  username: 'Steven Zhu',
  email: '',
  apiKey: '',
  modelId: 4,
})

// 获取用户设置
async function fetchUserConfig() {
  try {
    loading.value = true
    const { data } = await fetchUserSettings<UserSettings>()
    userInfo.value = { ...userInfo, ...data }
    // todo 更新userStore
    userStore.updateUserInfo(data)
  } finally {
    loading.value = false
  }
}

// 保存用户设置
async function saveUserConfig() {
  try {
    await saveUserSettings(
      userInfo.value.avatar,
      userInfo.value.username,
      userInfo.value.apiKey,
      userInfo.value.modelId
    )
    ElMessage({
      type: 'success',
      message: '保存成功',
    })
    // 更新本地用户信息
    userStore.updateUserInfo({
      avatar: userInfo.value.avatar,
      username: userInfo.value.username,
    })
  } catch (error: any) {
    console.log('SignIn Error', error)
    ElMessage({
      type: 'error',
      message: error.message,
    })
  }
}

onMounted(() => {
  fetchUserConfig()
})
</script>

<template>
  <div :show="loading" class="md:grid md:grid-cols-3 md:gap-6">
    <div class="mt-5 md:col-span-4 md:mt-0">
      <div class="shadow sm:overflow-hidden sm:rounded-md dark:bg-[#252529]">
        <div class="space-y-6 px-4 py-5 sm:p-6">
          <el-dialog
            v-model="showAvatarDialogVisible"
            title="请输入头像链接"
            width="30%"
          >
            <el-input v-model="userInfo.avatar" autocomplete="off" />
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="showAvatarDialogVisible = false">{{
                  t('common.cancel')
                }}</el-button>
                <el-button
                  type="primary"
                  @click="showAvatarDialogVisible = false"
                >
                  {{ t('common.confirm') }}
                </el-button>
              </span>
            </template>
          </el-dialog>

          <div>
            <h3 class="text-lg font-medium leading-6">
              {{ t('common.userSettings') }}
            </h3>
            <p class="mt-2 text-sm text-gray-500">
              <!-- {{ t('common.gptSettingsDesc') }} -->
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium leading-6">
              {{ t('common.avatar') }}
            </label>
            <div class="mt-2 flex items-center">
              <span
                class="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100"
              >
                <img
                  width="36"
                  height="36"
                  class="h-full w-full"
                  :src="userInfo.avatar"
                  alt=""
                />
              </span>
              <button
                @click="showAvatarDialogVisible = true"
                type="button"
                class="disabled:opacity-50 ml-5 rounded-md border ring-gray-300 dark:ring-blue-300 py-1.5 px-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50"
              >
                {{ t('common.change') }}
              </button>
            </div>
          </div>

          <div class="w-1/2">
            <div class="col-span-3 sm:col-span-2">
              <label class="block text-sm font-medium leading-6">
                {{ t('common.username') }}
              </label>
              <div class="mt-2 flex rounded-md shadow-sm">
                <input
                  v-model="userInfo.username"
                  type="text"
                  name="username"
                  id="username"
                  class="block w-full flex-1 rounded-md border-0 pl-2 py-1.5 ring-1 ring-inset ring-gray-300 dark:bg-[#252529] dark:text-white sm:text-sm sm:leading-6"
                  placeholder=""
                />
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium leading-6">
              {{ t('common.apiKey') }}
            </label>
            <div class="mt-2 flex">
              <div
                class="relative flex flex-grow items-stretch focus-within:z-10"
              >
                <input
                  name="apiKey"
                  id="apiKey"
                  class="block w-full flex-1 rounded-none rounded-l-md border-0 pl-2 py-1.5 ring-1 ring-inset ring-gray-300 dark:bg-[#252529] dark:text-white sm:text-sm sm:leading-6"
                  placeholder="sk-xxxxxx"
                />
              </div>
              <button
                type="button"
                class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:dark:bg-[#161618]"
              >
                <EyeIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>{{ t('common.show') }}</span>
              </button>
            </div>
            <p class="mt-2 text-sm text-gray-500">
              {{ t('common.getApiKey') }}
              <a
                href="https://platform.openai.com"
                target="_blank"
                class="text-indigo-600 ml-1"
              >
                https://platform.openai.com
              </a>
            </p>
          </div>

          <div>
            <ModelSelect></ModelSelect>
          </div>

          <div>
            <label class="block text-sm font-medium leading-6">
              {{ t('common.subscribe') }}
            </label>
            <div class="mt-2 flex items-center">
              <button
                type="button"
                class="inline-flex items-center space-x-2 rounded-md border border-gray-300 py-1.5 px-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50 dark:bg-[#252529] dark:text-white"
                @click="subscription = 0"
                :class="[
                  subscription == 0
                    ? 'bg-gray-50 dark:bg-white'
                    : 'bg-white dark:bg-gray-800',
                ]"
              >
                <span
                  :class="[subscription == 0 ? 'bg-green-400' : 'bg-gray-200']"
                  class="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                  aria-hidden="true"
                />
                <KeyIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span>{{ t('common.apiKey') }}</span>
              </button>

              <button
                @click="subscription = 1"
                type="button"
                class="inline-flex items-center space-x-2 ml-5 rounded-md border border-gray-300 py-1.5 px-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50 dark:bg-[#252529] dark:text-white"
                :class="[
                  subscription == 1
                    ? 'bg-gray-50 dark:bg-white'
                    : 'bg-white dark:bg-gray-800',
                ]"
              >
                <span
                  class="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                  :class="[subscription == 1 ? 'bg-green-400' : 'bg-gray-200']"
                  aria-hidden="true"
                />
                <UserIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span>{{ t('common.personal') }}</span>
              </button>

              <button
                type="button"
                class="inline-flex items-center space-x-2 ml-5 rounded-md border border-gray-300 py-1.5 px-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50 dark:bg-[#252529] dark:text-white"
                :class="[
                  subscription == 2
                    ? 'bg-gray-50 dark:bg-white'
                    : 'bg-white dark:bg-gray-800',
                ]"
              >
                <span
                  class="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                  :class="[subscription == 2 ? 'bg-green-400' : 'bg-gray-200']"
                />
                <UserGroupIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>{{ t('common.team') }}</span>
              </button>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-[#161618] px-4 py-3 text-right sm:px-6">
          <button
            @click="saveUserConfig"
            class="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            {{ t('common.save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
