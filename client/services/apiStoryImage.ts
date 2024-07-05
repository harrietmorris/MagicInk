import { firebaseConfig } from '@/firebaseConfig';
import { getApp, initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const app = initializeApp(firebaseConfig);
const firebaseApp = getApp();
const storyImageStorage = getStorage(firebaseApp, process.env.FIREBASE_STORY_API);

export const storeStoryImage = async (imageURL: string, filepath: string) => {
  try {
    const response = await fetch(imageURL);
    const imageBlob = await response.blob();
    const storageRef = ref(storyImageStorage, filepath);
    const metadata = {
      contentType: 'image/jpeg',
    };

    const result = await uploadBytes(storageRef, imageBlob, metadata);
    return result;
  } catch (error) {
    console.error('error storing story image', error);
  }
};

export const getStoryImage = async (storyId: number) => {
  try {
    const gsRef = ref(storyImageStorage, `gs://magicink-427207-story-image/${storyId}.jpeg`);
    const firebaseImage = await getDownloadURL(gsRef);
    return firebaseImage;
  } catch (error) {
    console.error('error getting story image', error);
  }
};
