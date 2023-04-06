import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post, get } from '@/utils/request'

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
  options?: { cid?: string | null; usingContext?: boolean | null }
  signal?: GenericAbortSignal
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
}) {
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

export function saveUserSettings<T>(settings: any) {
  return post<T>({
    url: '/api/v1/user/settings',
    data: settings
  })
}


export function fetchPricingPlan<T>() {
  return get<T>({
    url: '/api/v1/pricing/plans',
  })
}

export function fetchAppTags<T>() {
  return get<T>({
    url: `/api/v1/app/tags`,
  })
}

export function fetchApps<T>(name?: string, tagId?: string) {
  return get<T>({
    url: '/api/v1/app/list',
    data: {
      name: name,
      tag_id: tagId
    }
  })
}

export function fetchApp<T>(appId: string) {
  return get<T>({
    url: `/api/v1/app/${appId}`,
  })
}


export function fetchAppAsk<T>(appId: string, message: string) {
  return post<T>({
    url: `/api/v1/app/${appId}`,
    data: {
      message: message
    }
  })
}


export function fetchRoles<T>() {
  return get<T>({
    url: `/api/v1/chat/roles`,
  })
}