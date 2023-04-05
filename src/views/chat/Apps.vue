<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { HeartIcon, PlayIcon } from "@heroicons/vue/20/solid";
import { fetchApps } from "@/api";
import { useBasicLayout } from "@/hooks/useBasicLayout";
import { TagSelect } from "@/components";


const router = useRouter();
const { isMobile } = useBasicLayout();
const loading = ref(true);
const search = ref("");
const tagId = ref<string>();

interface App {
  id: string;
  emoji: string;
  name: string;
  name_en: string;
  description: string;
  description_en: string;
}

const apps = ref<Array<App>>([
  {
    id: "",
    emoji: "",
    name: "",
    name_en: "",
    description: "",
    description_en: "",
  },
]);

// 获取应用
async function fetchAppList(name?: string, tagId?: string) {
  try {
    loading.value = true;
    const { data } = await fetchApps<Array<App>>(name, tagId);
    apps.value = data;
  } finally {
    loading.value = false;
  }
}

// 回车搜索
function handleEnter(event: KeyboardEvent) {
  if (loading.value) {
    return;
  }

  if (!isMobile.value) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      fetchAppList(search.value);
    }
  } else {
    if (event.key === "Enter" && event.ctrlKey) {
      event.preventDefault();
      fetchAppList(search.value);
    }
  }
}
// 使用应用
function handleAppInfo(appId: string) {
  router.push({ name: "AppInfo", params: { appId: appId } });
}

// 更换TagID
function setTagId(id: string) {
  tagId.value = id;
  fetchAppList("", tagId.value);
}

onMounted(() => {
  fetchAppList();
});
</script>

<template>
  <div class="px-10 py-10 overflow-y-auto md:overscroll-none">
    <div class="flex flex-row justify-between">
      <div class="self-end relative w-2/5  md:w-1/5">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            class="w-5 h-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </span>

        <input
          v-model="search"
          @keypress="handleEnter"
          type="text"
          class="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
          placeholder="Search"
        />
      </div>

      <div class="w-2/5 pl-4 h-full">
        <TagSelect :tagId="tagId" :onSetTagId="setTagId"></TagSelect>
      </div>

      <div
        v-if="isMobile"
        @click="fetchAppList(search)"
        class="w-1/5 flex justify-center items-center rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900"
      >
        {{ $t('common.search') }}
      </div>

      <div
        v-if="!isMobile"
        class="w-1/12 flex justify-center items-center rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900"
      >
        {{ $t('common.create') }}
      </div>
    </div>

    <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
      <li
        v-for="app in apps"
        :key="app.id"
        class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white dark:bg-[#161618] text-center shadow-xl"
      >
        <div class="flex flex-1 flex-col p-8">
          <div class="mx-auto flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-3xl">
            {{ app.emoji }}</div>
          <h3 class="mt-6 text-sm font-medium text-gray-900 dark:text-white">{{ app.name }}</h3>
          <dl class="mt-1 flex flex-grow flex-col justify-between">
            <dt class="sr-only">Name</dt>
            <dd class="text-sm text-gray-500">{{ app.description }}</dd>
            <dt class="sr-only">Description</dt>
            <!-- <dd class="mt-3">
              <span class="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">{{ person.role }}</span>
            </dd> -->
          </dl>
        </div>
        <div>
          <div class="-mt-px flex divide-x divide-gray-200">
            <div class="flex w-0 flex-1">
              <div class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500 dark:text-white">
                <HeartIcon
                  class="h-5 w-5 text-gray-400  dark:text-white"
                  aria-hidden="true"
                />
                <span class="ml-3">推荐</span>
              </div>
            </div>
            <div class="-ml-px flex w-0 flex-1">
              <router-link
                :to="`/chat/apps/${app.id}`"
                class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500 dark:text-white"
              >
                <PlayIcon
                  class="h-5 w-5 text-gray-400  dark:text-white"
                  aria-hidden="true"
                />
                <span class="ml-3">运行</span>
              </router-link>
            </div>
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>
