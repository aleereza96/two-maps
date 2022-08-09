import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'

Vue.use(Router)

const options = {
  mode: 'history',
  routes: [
    {
      name: 'root',
      path: '/',
      redirect:'/receipt/30',
      component: App
    }
  ]
}

export default new Router(options)
