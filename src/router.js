import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/author/:userId',
      name: 'author',
      component: () => import(/* webpackChunkName: "author" */ './views/Author.vue')
    },
    {
      path: '/arxiv/:arxivId',
      name: 'paperArxiv',
      component: () => import(/* webpackChunkName: "paper" */ './views/Paper.vue')
    },
    {
      path: '/paper/:paperId',
      name: 'paperUpload',
      component: () => import(/* webpackChunkName: "paper" */ './views/Paper.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/mylibrary',
      name: 'MyLibrary',
      component: () => import(/* webpackChunkName: "mylibrary" */ './views/MyLibrary.vue')
    }
  ]
})
