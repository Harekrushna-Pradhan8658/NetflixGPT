// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlqRlzJ2gaBc6sUpfKLkRBg2mhq0X6azw",
  authDomain: "netfix-7d5d9.firebaseapp.com",
  projectId: "netfix-7d5d9",
  storageBucket: "netfix-7d5d9.firebasestorage.app",
  messagingSenderId: "1003598703197",
  appId: "1:1003598703197:web:964a16ae2a64d942d6bbb4",
  measurementId: "G-9NKBWQS2BB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();