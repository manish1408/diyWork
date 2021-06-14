import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBxcBiFutVmBYMG2b9m1-Wquq0OV68zN0",
  authDomain: "diywork-3dd69.firebaseapp.com",
  projectId: "diywork-3dd69",
  storageBucket: "diywork-3dd69.appspot.com",
  messagingSenderId: "959952387450",
  appId: "1:959952387450:web:a264a34f116c5e171aaac3",
  measurementId: "G-09WDL9H5DP",
};

var firebaseApp;

if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
  firebaseApp = firebase.app(); // if already initialized, use that one
}

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
