import Database from '../../database/Database'

class AuthRepository extends Database {
	signIn(email, password) {
		return this.firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
	}
	signUp(email, password) {
		return this.firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
	}
	signOut() {
		return this.firebase
			.auth()
			.signOut()
	}
}

export default new AuthRepository()
