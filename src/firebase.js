// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,browserLocalPersistence,indexedDBLocalPersistence} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:"AIzaSyDmoKUaPDvCRW3Jfn7pwp8ge74fDEjrTa0",
  authDomain: "myproject-c03b6.firebaseapp.com",
  projectId: "myproject-c03b6",
  storageBucket: "myproject-c03b6.appspot.com",
  messagingSenderId: "122053171468",
  appId: "1:122053171468:web:9076c569fb71b52b8f5129",
  measurementId: "G-5NSXRL44DD",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage= getStorage(app);



