<script lang="ts" setup>
import { useBasicLayout } from '@/hooks/useBasicLayout'
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";


const { isMobile } = useBasicLayout()
</script>

<template>
  <div class="flex">
    <div class="hidden md:flex">
      <Sidebar></Sidebar>
    </div>
    <div class="flex flex-col flex-grow flex-nowrap h-screen w-screen dark:bg-[#1e1e20]">
      <Navbar></Navbar>

      <RouterView v-slot="{ Component, route }">
        <component :is="Component" :key="route.fullPath" />
      </RouterView>
    </div>

  </div>
</template>