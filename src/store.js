import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let apiURL = 'https://fifhxbyp89.execute-api.us-east-1.amazonaws.com/dev'

export default new Vuex.Store({
  state: {
    stops: [],
    routes: [],
    departures: []
  },
  mutations: {
    setStops (state, stops) {
      state.stops = stops
    },
    setRoutes (state, routes) {
      state.routes = routes
    },
    setDepartures (state, departures) {
      state.departures = departures
    }
  },
  actions: {
    async getStops ({ commit }) {
      let res = await Axios.get(`${apiURL}/stops`)
      commit('setStops', res.data)
    },
    async getRoutes ({ commit }) {
      let res = await Axios.get(`${apiURL}/routes`)
      commit('setRoutes', res.data)
    },
    async getDepartures ({ commit }, { routes, date, stop }) {
      console.log('getting departures')
      console.log(date)
      console.log(stop)
      let res = await Axios.get(`${apiURL}/schedule`, {
        params: {
          routes, date, stop
        }
      })
      console.log(res.data)
      commit('setDepartures', res.data)
    }
  }
})
