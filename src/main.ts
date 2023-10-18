import './assets/main.css'
/* Set up using Vue 3 */
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar, faStarHalfStroke, faStarHalf } from '@fortawesome/free-solid-svg-icons'
library.add(faStar, faStarHalfStroke, faStarHalf)

const app = createApp(App)

app.use(createPinia())
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
