import { computed, watch } from 'vue'
import { useAppStore } from '@/store'
import { usePreferredDark } from '@vueuse/core'

export function useTheme() {
  const appStore = useAppStore()
  const OsTheme = usePreferredDark()

  const isDark = computed(() => {
    if (appStore.theme === 'auto') return OsTheme.value
    else return appStore.theme === 'dark'
  })

  const theme = computed(() => {
    return isDark.value ? 'dark' : 'light'
  })

  watch(
    () => isDark.value,
    (dark) => {
      if (dark) document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
    },
    { immediate: true }
  )

  return { theme }
}
