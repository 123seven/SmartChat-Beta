import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { t } from '@/locales'
import { useAppStore } from '@/store'


export function useUsingContext() {
  const appStore = useAppStore()

  const usingContext = ref<boolean>(appStore.usingContext)

  function toggleUsingContext() {
    usingContext.value = !usingContext.value
    if (usingContext.value) ElMessage.success(t('chat.turnOnContext'))
    else ElMessage.warning(t('chat.turnOffContext'))
  }

  return {
    usingContext,
    toggleUsingContext,
  }
}
