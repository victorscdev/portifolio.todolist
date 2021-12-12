import firebase from 'firebase/app'
import db from '../plugins/firebse'
// let user = JSON.parse(localStorage.getItem('user'));

export default class Database {
    constructor() {
			this.db = db;
			this.firebase = firebase;
			this.userCollection = db.collection('Users');
    }
}
