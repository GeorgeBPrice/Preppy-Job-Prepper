import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Import theme stylesheet
import './theme/styles/theme.css'
import './assets/styles/main.css'

// Import Prism.js for syntax highlighting
import 'prismjs/themes/prism-tomorrow.css'

// Add additional languages - include the ones you need
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'

// Add plugins if needed
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize theme
import { useThemeStore } from './theme/theme'

app.mount('#app')

// Load theme preference after app is mounted
const themeStore = useThemeStore()
themeStore.loadThemePreference()
