import './assets/main.css'
/* Set up using Vue 3 */
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
library.add(faStar)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
