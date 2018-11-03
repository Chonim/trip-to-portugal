// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import router from '@/plugins/vue-router'
import store from '@/store'
// import firebase from './plugins/vuefire'
import './plugins/firebase'
import './plugins/axios'
import './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
