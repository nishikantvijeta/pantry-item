



// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEimUHyqZNmgbg2vQWUtpMFwjlAWuU5s0",
    authDomain: "pantryy-37a15.firebaseapp.com",
    projectId: "pantryy-37a15",
    storageBucket: "pantryy-37a15.appspot.com",
    messagingSenderId: "494096696921",
    appId: "1:494096696921:web:99fcd7433288cb79e1d348",
    measurementId: "G-CW0HS1JDLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

