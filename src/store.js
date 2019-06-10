import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let apiURL = 'https://fifhxbyp89.execute-api.us-east-1.amazonaws.com/dev'

export default new Vuex.Store({
  state: {
    stops: []
  },
  mutations: {
    setStops (state, stops) {
      state.stops = stops
    }
  },
  actions: {
    async getStops ({ commit }) {
      let res = await Axios.get(`${apiURL}/stops`)
      commit('setStops', res.data)
    }
  }
})
