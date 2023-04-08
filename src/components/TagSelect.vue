<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { fetchAppTags } from "@/api";
import { t } from "@/locales";

interface Tag {
  id: string;
  name: string;
  name_en: string;
}

// Props
interface Props {
  tagId?: string;
}
const props = defineProps<Props>();

// Emit
interface Emit {
  (ev: "setTagId", id: string): void;
}
const emit = defineEmits<Emit>();
const tags = ref<Array<Tag>>([
  {
    id: "",
    name: "",
    name_en: "",
  },
]);

const selected = ref<Tag>({
  id: "",
  name: "未选择类型",
  name_en: "",
});

// 获取Tags
async function fetchAppList(name?: string) {
  try {
    const { data } = await fetchAppTags<Array<Tag>>();
    tags.value = data;
  } finally {
  }
}

// emit 设置Tag ID
function handleSetId(tagId: string) {
  emit("setTagId", tagId);
}

onMounted(() => {
  fetchAppList();
});
</script>

<template>
  <Listbox
    as="div"
    v-model="selected"
    @update:modelValue="value => handleSetId(value.id)"
  >
    <div class="relative">
      <ListboxButton class="relative w-4/5  md:w-1/2 cursor-default rounded-md border border-gray-300 bg-white dark:bg-[#252529] dark:text-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
        <span class="flex items-center">
          <span class="ml-3 block truncate">{{ selected.name }}</span>
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-[#252529] dark:text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption
            as="template"
            v-for="item in tags"
            :key="item.name"
            :value="item"
            v-slot="{ active, selected }"
          >
            <li :class="[
                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-3 pr-9 dark:bg-[#252529] dark:text-white',
              ]">
              <div class="flex items-center">

                <span :class="[
                    selected ? 'font-semibold' : 'font-normal',
                    'ml-3 block truncate',
                  ]">
                  {{ item.name }}
                </span>
              </div>

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-indigo-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
