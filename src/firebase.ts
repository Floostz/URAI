// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpm-Zz32sEYYV2jH5f7PCP2BcDxe1HsQw",
  authDomain: "urai-d1f1c.firebaseapp.com",
  projectId: "urai-d1f1c",
  storageBucket: "urai-d1f1c.firebasestorage.app",
  messagingSenderId: "431256076213",
  appId: "1:431256076213:web:54f6521a3d6155a4dae3fc",
  measurementId: "G-2PHNG76BCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);