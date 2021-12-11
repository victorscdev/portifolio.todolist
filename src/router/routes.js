import { routes as views } from '@/views'
import { routes as authentication } from '@/modules/Authentication'
import { routes as users } from '@/modules/Users'

export default [
	... views,
	... authentication,
	... users
]
