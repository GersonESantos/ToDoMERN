// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "sinric-d0f01.firebaseapp.com",
  databaseURL: "https://sinric-d0f01.firebaseio.com",
  projectId: "sinric-d0f01",
  storageBucket: "sinric-d0f01.firebasestorage.app",
  messagingSenderId: "350974242783",
  appId: "1:350974242783:web:1698fc4c1bf3e395861e6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };