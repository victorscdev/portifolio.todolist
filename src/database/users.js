// import firebase from 'firebase/app'
// import db from '../plugins/firebse'

// let fireAuth, loggedInuser, userColletion

// fireAuth = firebase.auth()
// userColletion = db.collection('Users')

// loggedInUser = fireAuth.onAuthStateChanged((user) => {return user.udi});

// export function getUserDatabase() {
//     userColletion
//         .get()
//         .then(function (querySnapshot) {
//             querySnapshot.forEach(function (doc) {
//                 console.log(doc);
//             });
//         })
//         .catch(function (error) {
//             console.log(error);
//         })
// }

// export default {
//     loggedInUser
// }