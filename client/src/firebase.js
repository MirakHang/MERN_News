// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-news.firebaseapp.com",
  projectId: "mern-news",
  storageBucket: "mern-news.appspot.com",
  messagingSenderId: "141044221026",
  appId: "1:141044221026:web:d0362eabe0aeb2cb43bd3b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
