import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentWeather: {},
    userLatitude: '',
    userLongitude: ''
  },
  mutations: {
    setCurrentWeather (state, payload) {
      state.currentWeather = payload
    }
  },
  actions: {},
  modules: {},
  getters: {}
})
