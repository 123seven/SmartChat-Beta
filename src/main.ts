import { createApp } from 'vue'
import App from './App.vue'
import { setupAssets } from './plugins'
import { setupI18n } from './locales'
import { setupStore } from './store'
import { setupRouter } from './router'

async function bootstrap() {
  const app = createApp(App)

  setupAssets()

  setupStore(app)

  setupI18n(app)

  await setupRouter(app)

  app.mount('#app')
}

bootstrap()
