
<script setup lang="ts">
interface Props {
  id: string;
  avatarUrl: string;
  content: string;
}
const props = defineProps<Props>();
</script>

<template>
  <div class="col-start-6 col-end-13 p-3 sm:col-start-6 sm:col-end-13 rounded-lg">
    <div class="flex justify-start flex-row-reverse items-center mx-auto">
      <img
        class="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0"
        :src="props.avatarUrl"
        alt="avatar"
      />
      <div class="relative mr-3 text-sm dark:bg-[#a1dc95] dark:text-black py-2 px-4 shadow rounded-xl">
        <div>{{props.content}}</div>
      </div>
    </div>
  </div>
</template>