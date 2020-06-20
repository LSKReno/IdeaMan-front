import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'
import axios from 'axios'
import VueAxios from 'vue-axios'

import overallConfig from './config'

Vue.config.productionTip = false

let axiosInstance = axios.create({
  baseURL: overallConfig.url.dev,
})

axiosInstance.interceptors.request.use(config => {
  if (store.getters.isAuthorized) {
    config.headers['Authorization'] = 'Bearer ' +
        store.state.auth.jsonAuthToken
  }
  return config
}, error => Promise.reject(error))

axiosInstance.interceptors.response.use(response => {
  window.console.log(response)
  if (response.headers['Authorization']) {
    store.commit('changeAuthToken',
        response.headers['Authorization'].replace('Bearer ', ''))
  }

  return response
}, error => {
  if (error.toString().endsWith('401')) {
    router.push({path: '/login'})
  }

  return Promise.reject(error)
})

Vue.use(VueAxios, axiosInstance)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
