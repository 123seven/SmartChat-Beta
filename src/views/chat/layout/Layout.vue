<script lang="ts" setup>
import Sidebar from "./Sidebar.vue";
</script>

<template>
  <div class="flex">
    <div class="flex">
      <Sidebar />
    </div>
    <div class="flex flex-col flex-nowrap h-screen w-screen dark:bg-[#1e1e20]">
      <RouterView v-slot="{ Component, route }">
        <component
          :is="Component"
          :key="route.fullPath"
        />
      </RouterView>
    </div>

  </div>
</template>