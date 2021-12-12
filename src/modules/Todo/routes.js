export default [
	{
    path: 'todolist',
    name: 'List',
		component: () => import(/* webpackChunkName: "todolist" */ './List/List.vue'),
    meta: { requiresAuth: true },
  },
]
