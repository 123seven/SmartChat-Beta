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
import { fetchRoles } from "@/api";


const loading = ref(true);


interface Role {
  id: number;
  role: string;
  name: string;
  name_en: string;
  avatar: string;
  bio: string;
}

const roles = ref<Array<Role>>([
  {
    id: 1,
    role: "Default",
    name: "Default",
    name_en: "Default",
    avatar: "https://i.328888.xyz/2023/04/05/i8Fi0A.png",
    bio: "你好！有什么我能帮助你的吗？",
  },
]);
const selected = ref<Role>(roles.value[0]);
console.log("selected:", selected)

// 获取角色
async function fetchRoleList() {
  try {
    loading.value = true;
    const { data } = await fetchRoles<Array<Role>>();
    roles.value = data;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchRoleList();
});
</script>

<template>
  <Listbox
  v-if="!loading"
    as="div"
    v-model="selected"
  >
    <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">角色</ListboxLabel>
    <div class="relative mt-2">
      <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
        <span class="flex items-center">
          <img
            :src="selected.avatar"
            :alt="selected.name_en"
            class="h-5 w-5 flex-shrink-0 rounded-full"
          />
          <span class="ml-3 block truncate">{{ selected.name }}</span>
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
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
        <ListboxOptions class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption
            as="template"
            v-for="role in roles"
            :key="role.id"
            :value="role"
            v-slot="{ active, selected }"
          >
            <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
              <div class="flex items-center">
                <img
                  :src="role.avatar"
                  alt=""
                  class="h-5 w-5 flex-shrink-0 rounded-full"
                />
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{ role.name }}</span>
              </div>

              <span
                v-if="selected"
                :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']"
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

