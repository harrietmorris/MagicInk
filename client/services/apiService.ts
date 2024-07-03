import { createImagePrompt } from '@/components/utils/imageGenPrompt';
import { ProfileType, StoryType, UserType } from '../types';
import axios, { AxiosResponse, isCancel, AxiosError } from 'axios';

// const BASE_URL = 'http://localhost:3000'; //this may need to change to IP address
const BASE_URL = 'http://10.0.2.2:3000'; //this is the URL used for android simulator
// const BASE_URL = 'http://192.168.0.22:3000'; //this is the URL used for ios


export const loginUser = async (userData: UserType): Promise<UserType> => {
  try {
    const { id, email, givenName, familyName, name } = userData;
    const response = await axios.post(`${BASE_URL}/users/login`, { id, email, givenName, familyName, name });
    return response.data;
  } catch (error) {
    console.error('Error logging user in', error);
    throw error;
  }
}

export const getUser = async (userId: string): Promise<UserType> => {
  try {
    const response: AxiosResponse<UserType> = await axios.get(`${BASE_URL}/users/${userId}`);
    return response.data;
  } catch (e) {
    console.error('error getting user', e);
    throw e;
  }
};

export const getAllProfiles = async (userId: string): Promise<ProfileType[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}/profiles`);
    return response.data;
  } catch (e) {
    console.error('Error getting profiles', e);
    throw e;
  }
};

export const getSelectedProfile = async (profileId: number): Promise<ProfileType> => {
  try {
    const response = await axios.get(`${BASE_URL}/profiles/${profileId}`);
    return response.data;
  } catch (e) {
    console.error('Error getting profile', e);
    throw e;
  }
};

export const getSelectedStory = async (storyId: number): Promise<StoryType> => {
  try {
    const response = await axios.get(`${BASE_URL}/stories/${storyId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting selected story', error);
    throw error;
  }
};

export const createStory = async (
  profId:number,
  readingLevel: string,
  location: string,
  readingTime: number,
  themes: string,
  chooseYourStory: boolean = false,
  breakpoints: number = 0,
) => {
  try {
    const response = await axios.post(`${BASE_URL}/profiles/${profId}/story`, {
      readingLevel,
      location,
      readingTime,
      themes,
      chooseYourStory,
      breakpoints,
    });
    return {status: response.status, storyDetails: response.data};
  } catch (error) {
    console.error('Error creating story', error);
    throw error;
  }
}

export const updateStory = async (
  profId: number,
  storyId: number,
  optionSelected: string,
) => {
  try {
    const response = await axios.patch(`${BASE_URL}/profiles/${profId}/story/${storyId}/${optionSelected}`);
    return {status: response.status, storyDetails: response.data};
  } catch (error) {
    console.error('Error updating story', error);
  }
}

export async function updateProfile(profile: ProfileType) {
  try {
    const response = await axios.patch(BASE_URL + `/profiles/${profile.id}`, profile);
    return response.data;
  } catch (error) {
    console.error('Error updating profile', error);
  }
}

export async function deleteProfile(profileId: number) {
  try {
    const response = await axios.delete(BASE_URL + `/profiles/${profileId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting profile', error);
  }
}

export const newProfile  = async (profileData: ProfileType, userId: string): Promise<ProfileType> => {
  try {
    const response: AxiosResponse<ProfileType> = await axios.post(`${BASE_URL}/users/${userId}/profiles`, profileData);
    return response.data;
  } catch (e) {
    console.error('Error creating profile', e);
    throw e;
  }
}

export const addToFavs = async (profileId: number, storyId: number): Promise<ProfileType> => {
  try {
    const response: AxiosResponse<ProfileType> = await axios.put(`${BASE_URL}/profiles/${profileId}/favs/${storyId}`);
    return response.data;
  } catch (error) {
    console.error('Error adding story to favorites', error);
    throw error;
  }
};

export const removeFromFavs = async (profileId: number, storyId: number): Promise<ProfileType> => {
  try {
    const response: AxiosResponse<ProfileType> = await axios.delete(`${BASE_URL}/profiles/${profileId}/favs/${storyId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing story from favorites', error);
    throw error;
  }
};

export const removeStoryFromProfile = async (profileId: number, storyId: number): Promise<ProfileType> => {
  try {
    const response: AxiosResponse<ProfileType> = await axios.delete(`${BASE_URL}/profiles/${profileId}/story/${storyId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing story from favorites', error);
    throw error;
  }
};

export const createImage = async (readingLevel: string, location: string, themes: string) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: process.env.CORTEXT_API ?? "",
    },
    body: JSON.stringify({
      messages: createImagePrompt(readingLevel, location, themes),
      model: 'cortext-image',
      size: '1024x1024',
      quality: 'standard',
      provider: 'OpenAI',
      steps: 30,
      cfg_scale: 8,
    }),
  };

  try {
    const response = await fetch('https://api.corcel.io/v1/image/cortext/text-to-image', options);
    const data = await response.json();
    return data[0].image_url;
  } catch (error) {
    console.error('Error generating image', error);
  }
};
