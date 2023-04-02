<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from "./Sidebar.vue";
import MobileSidebar from "./MobileSidebar.vue";

const route = useRoute()
const mobileMenu = ref<boolean>(false)

// 开启/关闭移动端侧边栏
function mobileMenuClose() {
  mobileMenu.value = !mobileMenu.value
}
// 移动端聊天页面不显示导航栏
const showMobileNav = computed(() =>
  route.name !== 'Chat'
)
</script>

<template>
  <div class="flex">
    <div class="hidden md:flex">
      <Sidebar></Sidebar>
    </div>
    <div class="flex flex-col flex-grow flex-nowrap h-screen dark:bg-[#1e1e20]">
      <!-- 移动端侧边栏 -->
      <MobileSidebar :mobileMenu="mobileMenu" @changeMenu="mobileMenuClose" :showNav="showMobileNav"></MobileSidebar>

      <RouterView v-slot="{ Component, route }">
        <component :is="Component" :key="route.fullPath" :mobileMenu="mobileMenu" @changeMenu="mobileMenuClose" />
      </RouterView>
    </div>

  </div>
</template>