<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAppStore, useChatStore } from "@/store";
import { useChat } from "@/views/chat/hooks/useChat";
import { fetchRoles } from "@/api";
import { v4 as uuidv4 } from "uuid";
import { t } from "@/locales";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { EnvelopeIcon, PhoneIcon, XMarkIcon } from "@heroicons/vue/20/solid";
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
const isOpen = ref<boolean>(false);

// 展示角色选择窗口
function showRoleList() {
  isOpen.value = true;
}

// 点击
function clickRole(role: Role, showMsg: boolean) {
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
      roleId: role.id,
      avatar: role.avatar,
    });

    addChat(uuid, {
      dateTime: new Date().toLocaleString(),
      text: role.bio,
      loading: true,
      inversion: false,
      error: false,
      conversationOptions: { roleId: role.id },
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
    class="pr-2"
  >
    <el-tooltip :content="selected.name">
      <img
        @click="showRoleList"
        class="relative z-auto inline-block h-10 w-10 rounded-full transform hover:scale-110 hover:z-50"
        :src="selected.avatar"
        :alt="selected.name"
      />
    </el-tooltip>
    <TransitionRoot
      appear
      :show="isOpen"
      as="template"
    >
      <Dialog
        as="div"
        @close="isOpen = false"
        class="relative z-10"
      >
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0">
          <div class="flex min-h-screen items-center justify-center p-4 m-8 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white dark:bg-black p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 "
                >
                  {{ $t('common.chooseChatRole') }}
                </DialogTitle>
                <div class="absolute top-0 right-0 pt-6 pr-4 ">
                  <button
                    type="button"
                    class="rounded-md"
                    @click="isOpen = false"
                  >
                    <span class="sr-only">Close</span>
                    <XMarkIcon
                      class="h-6 w-6 text-black dark:text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <div class="mt-4 max-h-96 overflow-y-auto no-scrollbar">
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div
                      v-for="role in roles"
                      :key="role.id"
                      :class="[role.id == selected.id ? 'border-gray-600 ring-offset-2 dark:border-[#10b982]': 'border-gray-300 dark:border-gray-600']"
                      @click="clickRole(role, true)"
                      class="relative flex items-center space-x-3 rounded-lg border bg-white dark:bg-black px-6 py-5 shadow-sm focus-within:ring-2  focus-within:ring-offset-2 hover:border-gray-600 dark:hover:border-[#10b982]"
                    >
                      <div class="flex-shrink-0">
                        <img
                          class="h-10 w-10 rounded-full"
                          :src="role.avatar"
                          alt=""
                        />
                      </div>
                      <div class="min-w-0 flex-1">
                        <div class="focus:outline-none">
                          <span
                            class="absolute inset-0"
                            aria-hidden="true"
                          />
                          <p class="text-sm font-medium ">
                            {{ role.name }}
                          </p>
                          <p class="truncate text-sm text-gray-500 dark:text-gray-400">
                            {{ role.bio }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>