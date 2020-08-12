// import Vue from 'vue'
import axios from 'axios'
import overallConfig from '../config'
import store from '../store'

let axiosInstance = axios.create({
    baseURL: overallConfig.url.dev
})

axiosInstance.interceptors.request.use(config => {
    if (store.getters.isAuthorized) {
        config.headers['Authorization'] = 'Bearer ' +
            store.state.auth.jsonAuthToken
    }
    return config
}, error => Promise.reject(error))

axiosInstance.interceptors.response.use(response => {
    if (response.headers['authorization']) {
        let token = response.headers['authorization'].replace('Bearer', '')
        window.localStorage.setItem(
            "ideaman_token", token
        );
        store.commit('changeAuthToken', token);

    }

    return response.data
}, error => {
    if (error.toString().endsWith('401')) {
        router.push({
            path: '/login'
        })
    }

    return Promise.reject(error)
})

export {
    axiosInstance as axios
}