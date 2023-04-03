<script lang="ts" setup>
import { ref } from "vue";
import { LanguageSelect } from '@/components'
import { useTheme } from '@/hooks/useTheme'
import { useAppStore } from '@/store'
import { saveUserSettings } from "@/api";
import {
  KeyIcon,
  UserIcon,
  UserGroupIcon,
  SunIcon,
  MoonIcon
} from "@heroicons/vue/20/solid";
import { ElDialog, ElMessage } from "element-plus";
import { useUserStore } from "@/store";
import { t } from "@/locales";

const userStore = useUserStore();
const appStore = useAppStore()
const { theme } = useTheme()

interface Settings {
  id: string;
  avatar: string;
  username: string;
  email: string;
}

interface Props {
  settings: Settings
}
const props = defineProps<Props>()
const settings = ref<Settings>(props.settings)

const showAvatarDialogVisible = ref(false);
const subscribe = ref(0);

// 保存用户设置
async function saveUserConfig() {
  try {
    await saveUserSettings(settings.value);
    ElMessage({
      type: "success",
      message: "保存成功",
    });
    // 更新本地用户信息
    userStore.updateUserInfo({
      avatar: settings.value.avatar,
      username: settings.value.username,
    });
  } catch (error: any) {
    console.log("SignIn Error", error);
    ElMessage({
      type: "error",
      message: error.message,
    });
  }
}
</script>

<template>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="mt-5 md:col-span-4 md:mt-0">
      <div class="shadow sm:overflow-hidden sm:rounded-md dark:bg-[#252529]">
        <div class="space-y-6 px-4 py-5 sm:p-6">
          <el-dialog v-model="showAvatarDialogVisible" title="请输入头像链接" width="30%">
            <el-input v-model="settings.avatar" autocomplete="off" />
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="showAvatarDialogVisible = false">{{
                  t('common.cancel')
                }}</el-button>
                <el-button type="primary" @click="showAvatarDialogVisible = false">
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
              <span class="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                <img width="36" height="36" class="h-full w-full" :src="settings.avatar" alt="" />
              </span>
              <button @click="showAvatarDialogVisible = true" type="button"
              class="disabled:opacity-50 ml-5 rounded-md border ring-gray-300 dark:ring-blue-300 py-1.5 px-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50">
              {{ t('common.change') }}
            </button>
          </div>
          </div>

          <div class="w-1/3">
            <div class="col-span-3 sm:col-span-2">
              <label class="block text-sm font-medium leading-6">
                {{ t('common.username') }}
              </label>
            <div class="mt-2 flex rounded-md shadow-sm">
              <input v-model="settings.username" type="text" name="username" id="username"
                class="block w-full flex-1 rounded-md border-0 pl-2 py-1.5 ring-1 ring-inset ring-gray-300 dark:bg-[#252529] dark:text-white sm:text-sm sm:leading-6"
                placeholder="" />
            </div>
          </div>
        </div>

        <div class="w-2/5">
          <div class="col-span-3 sm:col-span-2">
            <label class="block text-sm font-medium leading-6">
              {{ t('common.email') }}
            </label>
            <div class="mt-2 flex rounded-md shadow-sm">
              <input v-model="settings.email" type="text" name="email" id="email" disabled
                class="block w-full flex-1 rounded-md border-0 pl-2 py-1.5 ring-1 ring-inset ring-gray-300 dark:bg-[#161618] dark:text-white sm:text-sm sm:leading-6"
                placeholder="" />
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium leading-6">
            {{ t('common.theme') }}
            </label>
            <div class="mt-2 flex items-center">
              <button @click="appStore.setTheme('light')" type="button"
                class="inline-flex items-center space-x-2 w-1/10 rounded-md border border-gray-300 py-1.5 px-4 text-sm font-semibold shadow-sm hover:bg-gray-50">
                <SunIcon class="h-5 w-5" :class="[
                  theme == 'light' ? 'text-green-400' : 'text-gray-400',
                ]" aria-hidden="true" />
                <span>{{ t('common.white') }}</span>
              </button>

              <button @click="appStore.setTheme('dark')" type="button"
                class="inline-flex items-center space-x-2 ml-5 rounded-md border border-gray-300 py-1.5 px-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50">
                <MoonIcon class="h-5 w-5" :class="[
                  theme == 'dark' ? 'text-green-400' : 'text-gray-400',
                ]" aria-hidden="true" />
                <span>{{ t('common.dark') }}</span>
              </button>
            </div>
          </div>

          <div>
            <LanguageSelect></LanguageSelect>
          </div>

          <div>
            <label class="block text-sm font-medium leading-6">
              {{ t('common.subscribe') }}
            </label>
            <div class="mt-2 flex items-center">
              <button type="button"
                class="inline-flex items-center space-x-2 rounded-md border border-gray-300 py-1.5 px-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50 dark:bg-[#252529] dark:text-white"
                @click="subscribe = 0" :class="[
                  subscribe == 0
                    ? 'bg-gray-50 dark:bg-white'
                    : 'bg-white dark:bg-gray-800',
                ]">
                <span :class="[subscribe == 0 ? 'bg-green-400' : 'bg-gray-200']"
                  class="inline-block h-2 w-2 flex-shrink-0 rounded-full" aria-hidden="true" />
                <KeyIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span>免费</span>
              </button>

              <!-- <button @click="subscribe = 1" type="button"
                          class="inline-flex items-center space-x-2 ml-5 rounded-md border border-gray-300 py-1.5 px-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50 dark:bg-[#252529] dark:text-white"
                          :class="[
                            subscribe == 1
                              ? 'bg-gray-50 dark:bg-white'
                              : 'bg-white dark:bg-gray-800',
                          ]">
                          <span class="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                            :class="[subscribe == 1 ? 'bg-green-400' : 'bg-gray-200']" aria-hidden="true" />
                          <UserIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span>{{ t('common.personal') }}</span>
                        </button>

                        <button type="button"
                          class="inline-flex items-center space-x-2 ml-5 rounded-md border border-gray-300 py-1.5 px-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50 dark:bg-[#252529] dark:text-white"
                          :class="[
                            subscribe == 2
                              ? 'bg-gray-50 dark:bg-white'
                              : 'bg-white dark:bg-gray-800',
                          ]">
                          <span class="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                            :class="[subscribe == 2 ? 'bg-green-400' : 'bg-gray-200']" />
                          <UserGroupIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span>{{ t('common.team') }}</span>
                        </button> -->
            </div>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-[#161618] px-4 py-3 text-right sm:px-6">
          <button @click="saveUserConfig"
            class="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            {{ t('common.save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
