import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Settings } from 'luxon'

import VueAnalytics from 'vue-analytics'
import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'

Settings.defaultZoneName = 'utc'

delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

Vue.config.productionTip = false

Vue.use(Vuetify)

new Vue({
  router,
  store,
  vuetify: new Vuetify({
    theme: {
      dark: true
    }
  }),
  render: h => h(App)
}).$mount('#app')

Vue.use(VueAnalytics, {
  id: 'UA-141610301-2',
  router
})
