import {
  FIREBASE_API,
  FIREBASE_AUTHDOMAIN,
  FIREBASE_PROJECTID,
  FIREBASE_PROFILE_IMAGE_BUCKET,
  FIREBASE_MSGSENDERID,
  FIREBASE_APPID,
  FIREBASE_MEASUREMENTID,
} from '@env';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: FIREBASE_API,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_PROFILE_IMAGE_BUCKET,
  messagingSenderId: FIREBASE_MSGSENDERID,
  appId: FIREBASE_APPID,
  measurementId: FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { firebaseConfig, storage };
