import Vue from "vue";
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue';
import VueRouter from 'vue-router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import routes from './routes/index'

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = 'http://localhost:3000'; //doc

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

const router = new VueRouter({
    mode: 'history',
    routes: routes
  })

router.beforeEach((to, from, next) => {
  to.matched.some(route => {
    const token = localStorage.getItem('mini.wp.token')
    if (route.meta.isLoggedin) {
      if (token) {
        route.meta.username = localStorage.getItem('mini.wp.username')
        route.meta.userLoggedIn = true
        next();
      } else {
        next({ path: '/' });
      }
    }else{
      if (token) {
        route.meta.userLoggedIn = true
      }
    }
  })
  next();
})
new Vue({
    render: h => h(App),
    router,
    components: {App}
}).$mount('#app')
