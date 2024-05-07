// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMMoIyPFDBQwEk0zOXAsTvHWpxN7wVCFU",
  authDomain: "fire-vue-13912.firebaseapp.com",
  projectId: "fire-vue-13912",
  storageBucket: "fire-vue-13912.appspot.com",
  messagingSenderId: "46725608821",
  appId: "1:46725608821:web:27ea6a03e558bde6444f3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)