<script lang="ts" setup>
import { ref } from 'vue'
import { useTheme } from '@/hooks/useTheme'
import { useAppStore } from '@/store'

import { SunIcon, MoonIcon } from '@heroicons/vue/20/solid'
import { LanguageSelect } from '@/components'

import { t } from '@/locales'
const appStore = useAppStore()


const { theme } = useTheme()

const socksProxyStatus = ref(false)
const httpsProxyStatus = ref(false)

// appStore.setTheme(theme)
// appStore.setLanguage(value)
</script>

<template>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="mt-5 md:col-span-4 md:mt-0">
      <form action="#" method="POST" class="h-full">
        <div
          class="grid shadow sm:overflow-hidden sm:rounded-md h-full dark:bg-gray-800"
        >
          <div class="space-y-6 px-4 py-5 sm:p-6">
            <div>
              <h3 class="text-lg font-medium leading-6">
                {{ t('common.settings') }}
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                {{ t('common.sysBaseSettings') }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium leading-6">
                {{ t('common.theme') }}
              </label>
              <div class="mt-2 flex items-center">
                <button
                  @click="appStore.setTheme('light')"
                  type="button"
                  class="inline-flex items-center space-x-2 w-1/10 rounded-md border border-gray-300 py-1.5 px-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50"
                >
                  <SunIcon
                    class="h-5 w-5"
                    :class="[
                      theme == 'light' ? 'text-green-400' : 'text-gray-400',
                    ]"
                    aria-hidden="true"
                  />
                  <span>{{ t('common.white') }}</span>
                </button>

                <button
                  @click="appStore.setTheme('dark')"
                  type="button"
                  class="inline-flex items-center space-x-2 ml-5 rounded-md border border-gray-300 py-1.5 px-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50"
                >
                  <MoonIcon
                    class="h-5 w-5"
                    :class="[
                      theme == 'dark' ? 'text-green-400' : 'text-gray-400',
                    ]"
                    aria-hidden="true"
                  />
                  <span>{{ t('common.dark') }}</span>
                </button>
              </div>
            </div>

            <div>
              <LanguageSelect></LanguageSelect>
            </div>

            <div class="w-1/4">
              <div class="col-span-3 sm:col-span-2">
                <label class="block text-sm font-medium leading-6">
                  {{ t('common.requestTimeout') }}
                </label>
                <div class="relative mt-2 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="company-website"
                    id="company-website"
                    class="block w-full flex-1 rounded-md border-0 pl-2 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="100000"
                  />
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <span class="text-gray-500 sm:text-sm" id="price-currency">
                      {{ t('common.s') }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-2/3">
              <div class="col-span-3 sm:col-span-2">
                <label class="block text-sm font-medium leading-6">
                  {{ t('common.socksProxy') }}
                </label>
                <div class="mt-2 flex rounded-md">
                  <input
                    type="text"
                    name="company-website"
                    id="company-website"
                    class="block w-3/5 rounded-md border-0 pl-2 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="127.0.0.1:1081"
                  />
                  <button
                    type="button"
                    class="inline-flex items-center space-x-2 ml-5 rounded-md border border-gray-300 py-1.5 px-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50"
                    @click="
                      () => {
                        socksProxyStatus = !socksProxyStatus
                        httpsProxyStatus = false
                      }
                    "
                  >
                    <span
                      :class="[
                        socksProxyStatus ? 'bg-green-400' : 'bg-gray-200',
                      ]"
                      class="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                      aria-hidden="true"
                    />
                    <span>{{ socksProxyStatus ? t('common.close') : t('common.use') }}</span>
                  </button>
                </div>
              </div>
            </div>

            <div class="w-2/3">
              <div class="col-span-3 sm:col-span-2">
                <label class="block text-sm font-medium leading-6">
                  {{ t('common.httpsProxy') }}
                </label>
                <div class="mt-2 flex rounded-md">
                  <input
                    type="text"
                    name="company-website"
                    id="company-website"
                    class="block w-3/5 rounded-md border-0 pl-2 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="http://127.0.0.1:7890"
                  />
                  <button
                    type="button"
                    class="inline-flex items-center space-x-2 ml-5 rounded-md border border-gray-300 py-1.5 px-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50"
                    @click="
                      () => {
                        httpsProxyStatus = !httpsProxyStatus
                        socksProxyStatus = !false
                      }
                    "
                  >
                    <span
                      :class="[
                        socksProxyStatus ? 'bg-green-400' : 'bg-gray-200',
                      ]"
                      class="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                      aria-hidden="true"
                    />
                    <span>{{ httpsProxyStatus ? t('common.close') : t('common.use') }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 text-right sm:px-6 self-end">
            <button
              type="submit"
              class="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {{ t('common.save') }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
