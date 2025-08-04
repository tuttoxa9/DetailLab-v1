// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiXPi2xKdwbQZ36PV0hH9iTCz0kIV01q8",
  authDomain: "detaillab-98ede.firebaseapp.com",
  projectId: "detaillab-98ede",
  storageBucket: "detaillab-98ede.firebasestorage.app",
  messagingSenderId: "16207443199",
  appId: "1:16207443199:web:3f9f396defdeb2892688ca",
  measurementId: "G-SFL4VVJ7TB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
