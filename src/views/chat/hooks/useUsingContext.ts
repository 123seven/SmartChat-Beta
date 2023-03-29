import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { t } from '@/locales'

export function useUsingContext() {
  const usingContext = ref<boolean>(true)

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
