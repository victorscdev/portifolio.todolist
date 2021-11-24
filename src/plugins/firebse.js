import firebase from 'firebase';
import 'firebase/firestore'

const config = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    databaseURL: process.env.VUE_APP_DATA_BASE_URL,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    appId: process.env.VUE_APP_APP_ID,
};

const firebaseApp = firebase.initializeApp(config);

const firestore = firebaseApp.firestore();
firestore.settings({ timestampsInSnapshots: true })

export default firestore