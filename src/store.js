import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {
      username: '',
      name: '',
      jsonAuthToken: '',
    },
  },
  mutations: {
    authorize(state, {name, username, token}) {
      state.auth.name = name;
      state.auth.username = username;
      state.auth.jsonAuthToken = token;
    },
    changeAuthToken(state, {authToken}) {
      state.auth.jsonAuthToken = authToken
    }
  },
  getters: {
    isAuthorized(state) {
      return !!state.auth.jsonAuthToken;
    },
  },
  actions: {
    //
  },
});
