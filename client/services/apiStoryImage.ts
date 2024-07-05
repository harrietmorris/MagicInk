import { firebaseConfig } from '@/firebaseConfig';
import { getApp, initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const app = initializeApp(firebaseConfig);
const firebaseApp = getApp();
const storyImageStorage = getStorage(firebaseApp, process.env.FIREBASE_STORY_API);


export const storeStoryImage = async (imageURL: string, filepath: string) => {
  const response = await fetch(imageURL);
  const imageBlob = await response.blob();
  const storageRef = ref(storyImageStorage, filepath);

  const metadata = {
    contentType: 'image/jpeg',
  };

  const result = await uploadBytes(storageRef, imageBlob, metadata);
  console.log('Image uploaded successfully!');
  return result;
};


export const getStoryImage = async (storyId: number) => {
  const gsRef = ref(storyImageStorage, `${process.env.FIREBASE_STORY_API}/${storyId}.jpeg`);
  const firebaseImage = await getDownloadURL(gsRef);
  return firebaseImage;
};
