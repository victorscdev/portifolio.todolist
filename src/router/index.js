import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
import db from '../plugins/firebse'

Vue.use(VueRouter)
const routes = [
	{
    path: '*',
    redirect: '/signIn'
  },
  {
    path: '/',
    redirect: '/signIn'
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "signIn" */ '../modules/authentication/SignIn/SignIn.vue')
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "signUp" */ '../modules/authentication/SignUp/SignUp.vue')
	},
	{
    path: '/manageusers',
    name: 'ManageUsers',
    component: () => import(/* webpackChunkName: "manageusers" */ '../modules/Users/ManageUsers/ManageUsers.vue'),
    meta: {
      requiresAuth: true,
		},
		beforeEnter: (to, from, next) => {
			const uid = firebase.auth().currentUser.uid
			db.collection('Users')
				.doc(uid)
				.get()
				.then((res) => {
					const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
					let user = res.data().role

					if (!requiresAuth && user == 'Admin') next('manageusers')
					else if (requiresAuth && user ==  'Default') next('todolist')
					else next()
				})
		}
	},
	{
    path: '/myaccount',
    name: 'MyAccount',
    component: () => import(/* webpackChunkName: "myaccount" */ '../modules/Users/MyAccount/MyAccount.vue'),
    meta: {
      requiresAuth: true,
    },
	},
	{
    path: '/todolist',
    name: 'TodoList',
    component: () => import(/* webpackChunkName: "todolist" */ '../views/TodoList/TodoList.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('signIn');
  else if (!requiresAuth && currentUser) next('todolist');
  else next();
})

export default router
