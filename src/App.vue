<!-- <script lang="ts">
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/hooks/useLanguage'

// const { theme } = useTheme()
// const { language } = useLanguage()

</script> -->

<script lang="ts">
import { defineComponent } from "vue";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";

export default defineComponent({
  setup() {
    const { theme } = useTheme();
    const { language } = useLanguage();
  },
});
</script>


<template>
  <RouterView />
</template>
