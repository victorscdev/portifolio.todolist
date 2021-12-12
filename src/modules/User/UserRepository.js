import Database from "../../database/Database";

class UserRepository extends Database {
	fetchUser() {
		return this.userCollection
			.doc(this.firebase.auth().currentUser.uid)
			.get()
	}
	create(data) {
		return this.userCollection
			.doc(this.firebase.auth().currentUser.uid)
			.set(data)
	}
}

export default new UserRepository()
