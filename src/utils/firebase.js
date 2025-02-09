// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANfoHFP2asx_JxCs43FcWyK8qr8GeJDnE",
  authDomain: "netflix-clone-website-2cfa4.firebaseapp.com",
  projectId: "netflix-clone-website-2cfa4",
  storageBucket: "netflix-clone-website-2cfa4.firebasestorage.app",
  messagingSenderId: "206085755428",
  appId: "1:206085755428:web:2e355bc667b1aab3f3beb1",
  measurementId: "G-4E5MX4T2ZD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
