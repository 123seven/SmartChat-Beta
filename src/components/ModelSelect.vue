<script lang="ts" setup>
import { ref } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useAppStore } from '@/store'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/locales'

const appStore = useAppStore()

const models = [
  { id: 1, name: 'GPT-4', online: false },
  { id: 2, name: 'GPT-4-0314', online: false },
  { id: 3, name: 'GPT-4-32K', online: false },
  { id: 4, name: 'GPT-4-32K-0314', online: false },
  { id: 5, name: 'GPT-3.5-TURBO', online: true },
  { id: 6, name: 'GPT-3.5-TURBO-0301', online: true },
  { id: 7, name: 'TEXT-DAVINCI-003', online: true },
  { id: 8, name: 'TEXT-DAVINCI-002', online: false },
  { id: 9, name: 'CODE-DAVINCI-002', online: false },
]

interface Props {
  modelId: number,
}
const props = defineProps<Props>()
const selected = ref(models[props.modelId-1 || 4])

function setModel(modelId:  number) {
  console.log('modelId', modelId)
  appStore.setModelId(modelId)
}
</script>

<template>
  <Listbox as="div" v-model="selected" @update:modelValue="value => setModel(value.id)">
    <ListboxLabel class="block text-sm font-medium">{{
      t('common.gptModel')
    }}</ListboxLabel>
    <div class="relative mt-1">
      <ListboxButton
        class="relative w-1/2 cursor-default rounded-md border border-gray-300 bg-white dark:bg-[#252529] dark:text-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
      >
        <span class="flex items-center">
          <span
            :aria-label="selected.online ? 'Online' : 'Offline'"
            :class="[
              selected.online ? 'bg-green-400' : 'bg-gray-200',
              'inline-block h-2 w-2 flex-shrink-0 rounded-full',
            ]"
          />
          <span class="ml-3 block truncate">{{ selected.name }}</span>
        </span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-[#252529] dark:text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="item in models"
            :key="item.name"
            :value="item"
            @change="setModel(item.id)"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-3 pr-9 dark:bg-[#252529] dark:text-white',
              ]"
            >
              <div class="flex items-center">
                <span
                  :class="[
                    item.online ? 'bg-green-400' : 'bg-gray-200',
                    'inline-block h-2 w-2 flex-shrink-0 rounded-full',
                  ]"
                  aria-hidden="true"
                />
                <span
                  :class="[
                    selected ? 'font-semibold' : 'font-normal',
                    'ml-3 block truncate',
                  ]"
                >
                  {{ item.name }}
                  <span class="sr-only">
                    is {{ item.online ? 'online' : 'offline' }}</span
                  >
                </span>
              </div>

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-indigo-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
