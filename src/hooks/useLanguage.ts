import { computed } from 'vue'

import { useAppStore } from '@/store'
import { setLocale } from '@/locales'

export function useLanguage() {
  const appStore = useAppStore()

  const language = computed(() => {
    switch (appStore.language) {
      case 'en-US':
        setLocale('en-US')
      case 'zh-CN':
        setLocale('zh-CN')
      case 'zh-TW':
        setLocale('zh-TW')
      default:
        setLocale('zh-CN')
        return appStore.language || 'en-US'
    }
  })

  return { language }
}
