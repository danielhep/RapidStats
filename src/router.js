import Vue from 'vue'
import Router from 'vue-router'
import SelectAgency from './views/SelectAgency.vue'
import Stop from './views/InfoByStop.vue'
import store from './store'
import _ from 'lodash'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: SelectAgency
    },
    {
      path: '/:agency/stop',
      name: 'InfoByStop',
      component: Stop
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // if a new page is loaded and it contains the agency in the url parameter, we need to load that agency into the state
  if (to.params.agency) {
    if (!store.state.agencies.length) { await store.dispatch('getAgencies') }
    let currentAgency = _.find(store.state.agencies, { agency_key: to.params.agency })
    store.commit('setCurrentAgency', currentAgency._id)

    next()
  } else {
    next()
  }
})

export default router
