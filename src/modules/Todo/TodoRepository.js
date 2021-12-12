import Database from '../../database/Database';

class TodoRepository extends Database {
	fetchAll() {
		return this.userCollection
			.doc(this.firebase.auth().currentUser.uid)
			.collection('Tasks')
			.orderBy("createdAt", 'desc')
			.get()
	}
	create(data) {
		return this.userCollection
			.doc(this.firebase.auth().currentUser.uid)
			.collection('Tasks')
			.doc()
			.set(data)
	}
	edit(data) {
		return this.userCollection
			.doc(this.firebase.auth().currentUser.uid)
			.collection('Tasks')
			.doc(data)
	}
	delete(data) {
		return this.userCollection
			.doc(this.firebase.auth().currentUser.uid)
			.collection('Tasks')
			.doc(data)
			.delete()
	}
}

export default new TodoRepository()
