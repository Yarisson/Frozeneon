import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import App from './App.vue'
import store from './store'
import InstantSearch from 'vue-instantsearch/vue3/es';
import router from './router'

createApp(App).use(router).use(router).use(InstantSearch).use(store).mount('#app')
