import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA1XX6hxGNEN1Osbh1rOrcDJCWMoNVMH1Q",
  authDomain: "the-ultimateone-project.firebaseapp.com",
  projectId: "the-ultimateone-project",
  storageBucket: "the-ultimateone-project.appspot.com",
  messagingSenderId: "565266731343",
  appId: "1:565266731343:web:b0fbf0a6d015c3262ef53a",
  measurementId: "G-68V6T8HVPH",
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
