export default [
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
    component: () => import(/* webpackChunkName: "signIn" */ '@/modules/Auth/SignIn/SignIn.vue')
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "signUp" */ '@/modules/Auth/SignUp/SignUp.vue')
	},
]
