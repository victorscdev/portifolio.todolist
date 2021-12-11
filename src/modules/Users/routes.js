import firebase from 'firebase/app'
import db from '../../plugins/firebse'

export default [
	{
    path: '/manageusers',
    name: 'ManageUsers',
    component: () => import(/* webpackChunkName: "manageusers" */ './ManageUsers/ManageUsers.vue'),
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
    component: () => import(/* webpackChunkName: "myaccount" */ './MyAccount/MyAccount.vue'),
    meta: {
      requiresAuth: true,
    },
	},
]
