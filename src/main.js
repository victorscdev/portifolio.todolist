import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

import '../src/plugins/firebse'
import store from './store/store'

Vue.config.productionTip = false

let app = '';
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
