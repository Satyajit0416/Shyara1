import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPhoneNumber, signInWithPopup, GoogleAuthProvider, RecaptchaVerifier } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCe90FaYPSZwc4ITVCoe_MiCcFCCA25-JI",
  authDomain: "shyara-fc8f6.firebaseapp.com",
  projectId: "shyara-fc8f6",
  storageBucket: "shyara-fc8f6.appspot.com", // Corrected format
  messagingSenderId: "952670844305",
  appId: "1:952670844305:web:d582ed5ce5c4972d565630",
  measurementId: "G-P0GS7P2JNR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

export { db, auth, storage, signInWithPhoneNumber, signInWithPopup, googleProvider, RecaptchaVerifier };