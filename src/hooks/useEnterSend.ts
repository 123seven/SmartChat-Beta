import { computed } from 'vue'
import { useAppStore } from '@/store'

export function useEnterSend() {
  const appStore = useAppStore()

  const enterSend = computed(() => {
    return appStore.useEnter
  })

  return { enterSend }
}
