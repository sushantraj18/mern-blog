// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-blog-e12d3.firebaseapp.com",
  projectId: "mern-blog-e12d3",
  storageBucket: "mern-blog-e12d3.firebasestorage.app",
  messagingSenderId: "502503050570",
  appId: "1:502503050570:web:bc63ae59d97e5bd45405b3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);