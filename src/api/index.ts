import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post, get } from '@/utils/request'
import { useSettingStore } from '@/store'

export function fetchChatAPI<T = any>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal
) {
  return post<T>({
    url: '/chat',
    data: { prompt, options },
    signal,
  })
}

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: '/config',
  })
}

export function fetchChatAPIProcess<T = any>(params: {
  prompt: string
  options?: { conversationId?: string; parentMessageId?: string }
  signal?: GenericAbortSignal
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
}) {
  // const settingStore = useSettingStore()

  return post<T>({
    url: '/api/v1/chat/ask/stream',
    data: {
      message: params.prompt,
      options: params.options,
      systemMessageId: 1,
    },
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
  })
}

export function fetchSession<T>() {
  return post<T>({
    url: '/session',
  })
}

export function fetchVerify<T>(token: string) {
  return post<T>({
    url: '/verify',
    data: { token },
  })
}

export function fetchSignIn<T>(email: string, password: string) {
  return post<T>({
    url: '/api/v1/user/signin',
    data: { email: email, password: password },
  })
}

export function fetchSignUp<T>(
  username: string,
  email: string,
  password: string
) {
  return post<T>({
    url: '/api/v1/user/signup',
    data: { username: username, email: email, password: password },
  })
}

export function fetchUserSettings<T>() {
  return get<T>({
    url: '/api/v1/user/settings',
  })
}

export function saveUserSettings<T>(
  avatar?: string,
  username?: string,
  apiKey?: string,
  modelId?: number
) {
  return post<T>({
    url: '/api/v1/user/settings',
    data: {
      avatar: avatar,
      username: username,
      apiKey: apiKey,
      modelId: modelId,
    },
  })
}
