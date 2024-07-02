// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {FIREBASE_API, FIREBASE_AUTHDOMAIN, FIREBASE_PROJECTID, FIREBASE_BUCKET, FIREBASE_MSGSENDERID, FIREBASE_APPID, FIREBASE_MEASUREMENTID} from '@env';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_BUCKET,
  messagingSenderId: FIREBASE_MSGSENDERID,
  appId: FIREBASE_APPID,
  measurementId: FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {firebaseConfig}