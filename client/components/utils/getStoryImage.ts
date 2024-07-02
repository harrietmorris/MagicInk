import { firebaseConfig } from '@/firebaseConfig';
import { getApp, initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';


const app = initializeApp(firebaseConfig);
const firebaseApp = getApp();
const storyImageStorage = getStorage(firebaseApp, process.env.FIREBASE_STORY_API);

export const getStoryImage = async (imageURL: string, filepath: string) => {
  const response = await fetch(imageURL);
  const imageBlob = await response.blob();

  const storageRef = ref(storyImageStorage, filepath);
  await uploadBytes(storageRef, imageBlob);

  console.log('Image uploaded successfully!');

  const firebaseImageUrl = await getDownloadURL(storageRef);
  return firebaseImageUrl;
};
