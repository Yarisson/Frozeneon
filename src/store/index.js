import { createStore } from 'vuex'

export default createStore({
  state: {
    packages: [],
  },
  mutations: {
    replacePackages(state, payload) {
      state.packages = payload;
    },
  },
})
