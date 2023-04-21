import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import enUS from './en-US'
import zhCN from './zh-CN'
import zhTW from './zh-TW'
import { useAppStoreWithOut } from '@/store/modules/app'
import type { Language } from '@/store/modules/app/helper'
import { usePreferredLanguages } from '@vueuse/core'

const appStore = useAppStoreWithOut()
const languages = usePreferredLanguages()

let defaultLocale = appStore.language

if (!defaultLocale) {
  if (languages.value[0] == 'en') {
    defaultLocale = 'en-US'
  } else if (languages.value[0] == 'zh-CN' || languages.value[0] == 'zh') {
    defaultLocale = 'zh-CN'
  } else if (languages.value[0] == 'zh-TW' || languages.value[0] == 'zh-HK') {
    defaultLocale = 'zh-TW'
  } else {
    defaultLocale = 'zh-CN'
  }
  appStore.setLanguage(defaultLocale)
}

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  allowComposition: true,
  messages: {
    'en-US': enUS,
    'zh-CN': zhCN,
    'zh-TW': zhTW,
  },
})

export const t = i18n.global.t

export function setLocale(locale: Language) {
  i18n.global.locale = locale
}

export function setupI18n(app: App) {
  app.use(i18n)
}

export default i18n
