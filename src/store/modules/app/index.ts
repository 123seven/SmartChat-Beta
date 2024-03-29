import { defineStore } from 'pinia'
import type { AppState, Language, Theme } from './helper'
import { getLocalSetting, setLocalSetting } from './helper'
import { store } from '@/store'

export const useAppStore = defineStore('app-store', {
  state: (): AppState => getLocalSetting(),
  actions: {
    setSiderCollapsed(collapsed: boolean) {
      this.siderCollapsed = collapsed
      this.recordState()
    },

    setTheme(theme: Theme) {
      this.theme = theme
      this.recordState()
    },

    setLanguage(language: Language) {
      if (this.language !== language) {
        this.language = language
        this.recordState()
      }
    },

    setUseEnter() {
      this.useEnter = !this.useEnter
      this.recordState()
    },

    setUsingContext(usingContext: boolean) {
      this.usingContext = usingContext
      this.recordState()
    },

    setModelId(modelId: number) {
      this.modelId = modelId
      this.recordState()
    },

    setRoleId(roleId: number) {
      this.roleId = roleId
      this.recordState()
    },

    setRoleAvatar(roleAvatar: string) {
      this.roleAvatar = roleAvatar
      this.recordState()
    },

    setNotify() {
      this.notify = false
      this.recordState()
    },

    recordState() {
      setLocalSetting(this.$state)
    },
  },
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
