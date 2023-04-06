<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { fetchRoles } from "@/api";
import { useAppStore, useChatStore } from "@/store";
import { useChat } from "@/views/chat/hooks/useChat";
import { useRoute } from "vue-router";
import { v4 as uuidv4 } from "uuid";

const appStore = useAppStore();
const chatStore = useChatStore();
const route = useRoute();
const { addChat } = useChat();
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
console.log("selected:", selected.value);

// 点击
function clickRole(role: Role, showMsg: boolean) {
  console.log("clickRole", role);
  selected.value = role;
  // 改变数组顺序
  const index = roles.value.indexOf(role);
  if (index !== -1) {
    roles.value.splice(index, 1); // 从原位置删除
    roles.value.unshift(role); // 添加到开头
  }
  appStore.setRoleId(role.id);
  appStore.setRoleAvatar(role.avatar);

  if (showMsg) {
    const uuid = uuidv4().replace(/-/g, "");
    // 主页面最多只显示最近5条对话记录
    if (chatStore.history.length === 5) {
      console.log("delete local last chat history...");
      chatStore.deleteHistory(4);
    }
    chatStore.addHistory({
      title: `New Chat By ${role.name_en}`,
      uuid: uuid,
      isEdit: false,
    });

    addChat(uuid, {
      dateTime: new Date().toLocaleString(),
      text: role.bio,
      loading: true,
      inversion: false,
      error: false,
      conversationOptions: { roleId: role.id, avatar: role.avatar },
      requestOptions: { prompt: role.bio, options: null },
    });
  }
}

// 获取角色
async function fetchRoleList() {
  try {
    loading.value = true;
    const { data } = await fetchRoles<Array<Role>>();
    roles.value = data;
    // 设置以及选择好的角色
    const role = data.find((r) => r.id === appStore.roleId);
    if (role) {
      clickRole(role, false);
    }
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchRoleList();
});
</script>



<template>
  <div
    v-if="!loading"
    class="pr-2 md:pr-4"
  >
    <div class="isolate flex -space-x-2 overflow-hidden overflow-x-auto no-scrollbar w-10 md:w-36 ">
      <el-tooltip
        v-for="role in roles"
        :key="role.id"
        :content="role.name"
      >
        <img
          @click="clickRole(role, true)"
          :class="selected.id === role.id? 'scale-110 z-50' : ''"
          class="relative z-auto inline-block h-10 w-10 rounded-full transform hover:scale-110 hover:z-50 "
          :src="role.avatar"
          :alt="role.name"
        />

      </el-tooltip>
    </div>
  </div>
</template>