import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {LMap, LTileLayer,  LCircleMarker, LTooltip} from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import 'normalize.css'
import '@/styles/style.css'

Vue.config.productionTip = false

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-circle-marker', LCircleMarker)
Vue.component('l-tooltip', LTooltip)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
