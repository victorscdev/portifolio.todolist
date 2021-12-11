export default [
	{
    path: '/todolist',
    name: 'TodoList',
    component: () => import(/* webpackChunkName: "todolist" */ './TodoList/TodoList.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]
