// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAAxmMeZTA6LjNryjhyBkn37iQlEnE4vw",
  authDomain: "shopappintern.firebaseapp.com",
  projectId: "shopappintern",
  storageBucket: "shopappintern.appspot.com",
  messagingSenderId: "172126909570",
  appId: "1:172126909570:web:31e07fcdbb69f85151b09b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};