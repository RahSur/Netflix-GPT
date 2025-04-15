// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAD6CiS0_f2mbnVNHOGKh6q-dBGEVcB5vM",
    authDomain: "nettflix-gpt.firebaseapp.com",
    projectId: "nettflix-gpt",
    storageBucket: "nettflix-gpt.firebasestorage.app",
    messagingSenderId: "40223798002",
    appId: "1:40223798002:web:8888fd384725139145566b",
    measurementId: "G-2JV3VCY60G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();