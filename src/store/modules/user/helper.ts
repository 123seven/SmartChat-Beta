import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface UserInfo {
  id: string
  email: string
  avatar: string
  username: string
  auth: boolean
  token: string
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      id: '1',
      avatar: 'https://i2.100024.xyz/2023/04/01/kbe6yb.webp',
      username: 'Test',
      email: '',
      auth: true,
      token: '',
    },
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}
