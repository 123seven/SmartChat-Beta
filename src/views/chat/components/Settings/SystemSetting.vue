<script lang="ts" setup>
import { ref } from 'vue'
import { useAppStore } from '@/store'
import { ModelSelect } from "@/components";
import { EyeIcon } from '@heroicons/vue/20/solid'
import { saveUserSettings } from "@/api";
import { ElMessage } from "element-plus";
import { t } from '@/locales'

const appStore = useAppStore()


interface Settings {
  apiKey: string,
  modelId: number,
  usingContext: boolean,
  contextCount: number,
  temperature: number,
  presencePenalty: number,
  frequencyPenalty: number,
}

interface Props {
  settings: Settings
}
const props = defineProps<Props>()
const settings = ref<Settings>(props.settings)


// 保存用户设置
async function saveUserConfig() {
  try {
    await saveUserSettings(settings);
    ElMessage({
      type: "success",
      message: "保存成功",
    });
  } catch (error: any) {
    console.log("Save Error", error);
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
      <div class="h-full">
        <div class="grid shadow sm:overflow-hidden sm:rounded-md h-full dark:bg-[#252529]">
          <div class="space-y-6 px-4 py-5 sm:p-6">
            <div>
              <h3 class="text-lg font-medium leading-6">
                {{ t('common.settings') }}
              </h3>
              <p class="mt-2 text-sm text-gray-500">
                {{ t('common.sysBaseSettings') }}
              </p>
            </div>

            <div class="w-2/3">
              <div class="col-span-3 sm:col-span-2">
                <label class="block text-sm font-medium leading-6">
                  {{ t('common.contextCount') }}
                </label>
                <div class="mt-2 flex rounded-md">
                  <input type="text" name="company-website" id="company-website" :value="settings.contextCount"
                    class="block w-1/5 rounded-md border-0 pl-2 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="" />

                  <button type="button"
                    class="inline-flex items-center space-x-2 ml-5 rounded-md border border-gray-300 py-1.5 px-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50"
                    @click="settings.usingContext = !settings.usingContext">
                    <span :class="[settings.usingContext ? 'bg-green-400' : 'bg-gray-200',]"
                      class="inline-block h-2 w-2 flex-shrink-0 rounded-full" aria-hidden="true" />
                    <span>{{ settings.usingContext ? t('common.close') : t('common.use') }}</span>
                  </button>
                </div>
              </div>
            </div>

            <div class="w-1/5">
              <div class="col-span-3 sm:col-span-2">
                <label class="block text-sm font-medium leading-6">
                  {{ t('common.temperature') }}
                </label>
                <div class="relative mt-2 flex rounded-md shadow-sm">
                  <input type="text" :value="settings.temperature"
                    class="block w-1/5 flex-1 rounded-md border-0 pl-2 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="5" />

                </div>
              </div>
            </div>

            <div class="flex flex-row md:flex-wrap gap-x-8">
              <div class="col-span-3 sm:col-span-2">
                <label class="block text-sm font-medium leading-6">
                  {{ t('common.presencePenalty') }}
                </label>
                <div class="relative mt-2 flex rounded-md shadow-sm">
                  <input type="text" :value="settings.presencePenalty"
                    class="block w-1/5 flex-1 rounded-md border-0 pl-2 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="5" />

                </div>
              </div>

              <div class="col-span-3 sm:col-span-2">
                <label class="block text-sm font-medium leading-6">
                  {{ t('common.frequencyPenalty') }}
                </label>
                <div class="relative mt-2 flex rounded-md shadow-sm">
                  <input type="text" :value="settings.frequencyPenalty"
                    class="block w-1/5 flex-1 rounded-md border-0 pl-2 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="5" />

                </div>
              </div>
            </div>

            <div>
              <ModelSelect></ModelSelect>
            </div>

            <div>
              <label class="block text-sm font-medium leading-6">
                {{ t('common.apiKey') }}
              </label>
              <div class="mt-2 flex">
                <div class="relative flex flex-grow items-stretch focus-within:z-10">
                  <input name="apiKey" id="apiKey"
                    class="block w-full flex-1 rounded-none rounded-l-md border-0 pl-2 py-1.5 ring-1 ring-inset ring-gray-300 dark:bg-[#252529] dark:text-white sm:text-sm sm:leading-6"
                    placeholder="sk-xxxxxx" />
                </div>
                <button type="button"
                  class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:dark:bg-[#161618]">
                  <EyeIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span>{{ t('common.use') }}</span>
                </button>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                {{ t('common.getApiKey') }}
                <a href="https://platform.openai.com" target="_blank" class="text-indigo-600 ml-1">
                  https://platform.openai.com
                </a>
              </p>
            </div>

          </div>
          <div class="bg-gray-50 dark:bg-[#161618] px-4 py-3 text-right sm:px-6 self-end">
            <button @click="saveUserConfig"
              class="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
              {{ t('common.save') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
