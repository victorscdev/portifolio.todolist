import { routes as auth } from '@/modules/Auth'
import { routes as todo } from '@/modules/Todo'
import { routes as user } from '@/modules/User'

export default [
	... auth,
	... user,
	... todo
]
