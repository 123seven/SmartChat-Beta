<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { fetchUserSettings } from "@/api";
import { useUserStore } from "@/store";
import { SystemSetting, UserSetting } from './components'

const loading = ref(true);
const userStore = useUserStore();

interface userPlan {
  id: string;
  zh_name: string;
  en_name: string;
  zh_tw_name: string;
}

interface Settings {
  id: string;
  avatar: string;
  username: string;
  email: string;
  apiKey?: string;
  modelId: number;
  usingContext: boolean,
  contextCount: number,
  temperature: number,
  presencePenalty: number,
  frequencyPenalty: number,
  userPlan: userPlan,
}

const settings = ref<Settings>({
  id: "1",
  avatar: "https://i2.100024.xyz/2023/04/01/kbe6yb.webp",
  username: "Test",
  email: "steven.zhu.email@gmail.com",
  apiKey: undefined,
  modelId: 4,
  usingContext: true,
  contextCount: 5,
  temperature: 0.5,
  presencePenalty: 0.0,
  frequencyPenalty: 0.0,
  userPlan: {
    id: "",
    zh_name: "",
    en_name: "",
    zh_tw_name: "",
  }
});

// 获取用户设置
async function fetchUserConfig() {
  try {
    loading.value = true;
    const { data } = await fetchUserSettings<Settings>();
    settings.value = data;
    // 更新userStore
    userStore.updateUserInfo(data);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchUserConfig();
});
</script>

<template>
  <div :show="loading" class="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:m-12">
    <UserSetting v-if="!loading" :settings="settings"></UserSetting>
    <SystemSetting v-if="!loading" :settings="settings"></SystemSetting>
  </div>
</template>
