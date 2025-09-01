// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDu1e2HFQIBkfJqQf9y07c-h2pGThnDOYA",
  authDomain: "netflix-gpt-d5030.firebaseapp.com",
  projectId: "netflix-gpt-d5030",
  storageBucket: "netflix-gpt-d5030.firebasestorage.app",
  messagingSenderId: "860266191847",
  appId: "1:860266191847:web:fdf668e5aa5ac82958bb42",
  measurementId: "G-07S8WVFJW6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();