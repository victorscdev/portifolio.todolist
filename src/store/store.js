import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		fb: {
			auth: {
				fireAuth: firebase.auth()
			}
		}
  },
  mutations: {
	},
	getters: {
	},
  actions: {
  },
  modules: {
  }
})

export default { store }
