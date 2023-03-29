<script lang="ts" setup>
import { ref } from 'vue'
import { ModelSelect } from '@/components'
import {
  EyeIcon,
  KeyIcon,
  UserIcon,
  UserGroupIcon,
} from '@heroicons/vue/20/solid';

import { t } from '@/locales'

const subscription = ref(0)
</script>

<template>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="mt-5 md:col-span-4 md:mt-0">
      <form action="#" method="POST">
        <div class="shadow sm:overflow-hidden sm:rounded-md dark:bg-gray-800">
          <div class="space-y-6 px-4 py-5 sm:p-6">
            <div>
              <h3 class="text-lg font-medium leading-6">
                {{ t('common.gptSettings') }}
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                {{ t('common.gptSettingsDesc') }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium leading-6">
                {{ t('common.photo') }}
              </label>
              <div class="mt-2 flex items-center">
                <span
                  class="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100"
                >
                  <svg
                    class="h-full w-full"
                    fill="#000000"
                    viewBox="0 0 24 24"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <title>OpenAI icon</title>
                      <path
                        d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
                      ></path>
                    </g>
                  </svg>
                
                  <img
                    width="{36}"
                    height="{36}"
                    class="h-full w-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  
                </span>
                <button
                  disabled
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
                  {{ t('common.name') }}
                </label>
                <div class="mt-2 flex rounded-md shadow-sm">
                  <input
                    disabled
                    type="text"
                    name="company-website"
                    id="company-website"
                    class="block w-full flex-1 rounded-md border-0 pl-2 py-1.5 ring-1 ring-inset ring-gray-300 dark:ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="ChatGPT"
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
                    class="block w-full flex-1 rounded-none rounded-l-md border-0 pl-2 py-1.5 ring-1 ring-inset ring-gray-300 dark:ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="sk-xxxxxx"
                  />
                </div>
                <button
                  type="button"
                  class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <EyeIcon
                    class="h-5 w-5 text-gray-400 dark:text-gray-100"
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
                {{ t('common.subscription') }}
              </label>
              <div class="mt-2 flex items-center">
                <button
                  type="button"
                  class="inline-flex items-center space-x-2 w-1/10 rounded-md border border-gray-300 py-1.5 px-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50"
                  @click="subscription = 0"
                  :class="[
                    subscription == 0
                      ? 'bg-gray-50 dark:bg-white'
                      : 'bg-white dark:bg-gray-800',
                  ]"
                >
                  <span
                    :class="[
                      subscription == 0 ? 'bg-green-400' : 'bg-gray-200',
                    ]"
                    class="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                    aria-hidden="true"
                  />
                  <KeyIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span>{{ t('common.apiKey') }}</span>
                </button>

                <button
                  @click="subscription = 1"
                  type="button"
                  class="inline-flex items-center space-x-2 ml-5 rounded-md border border-gray-300 py-1.5 px-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50"
                  :class="[
                    subscription == 1
                      ? 'bg-gray-50 dark:bg-white'
                      : 'bg-white dark:bg-gray-800',
                  ]"
                >
                  <span
                    class="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                    :class="[
                      subscription == 1 ? 'bg-green-400' : 'bg-gray-200',
                    ]"
                    aria-hidden="true"
                  />
                  <UserIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span>{{ t('common.personal') }}</span>
                </button>

                <button
                  type="button"
                  class="dark:text-gray-800 inline-flex items-center space-x-2 ml-5 rounded-md border border-gray-300 py-1.5 px-2.5 text-sm font-semibold shadow-sm hover:bg-gray-50"
                  :class="[
                    subscription == 2
                      ? 'bg-gray-50 dark:bg-white'
                      : 'bg-white dark:bg-gray-800',
                  ]"
                >
                  <span
                    class="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                    :class="[
                      subscription == 2 ? 'bg-green-400' : 'bg-gray-200',
                    ]"
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

          <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
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
