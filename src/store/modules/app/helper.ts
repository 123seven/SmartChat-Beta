import { ss } from '@/utils/storage'

const LOCAL_NAME = 'appSetting'

export type Theme = 'light' | 'dark' | 'auto'

export type Language = 'zh-CN' | 'zh-TW' | 'en-US'

export interface AppState {
  siderCollapsed: boolean
  theme: Theme
  language: Language | null
  useEnter: boolean
  usingContext: boolean
  modelId: number
  roleId: number
  roleAvatar: string
}

export function defaultSetting(): AppState {
  return {
    siderCollapsed: false,
    theme: 'light',
    language: null,
    useEnter: false,
    usingContext: true,
    modelId: 4,
    roleId: 1,
    roleAvatar: 'https://i.328888.xyz/2023/04/05/i8Fi0A.png',
  }
}

export function getLocalSetting(): AppState {
  const localSetting: AppState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalSetting(setting: AppState): void {
  ss.set(LOCAL_NAME, setting)
}
