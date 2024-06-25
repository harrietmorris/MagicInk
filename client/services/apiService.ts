import { ProfileType, StoryType, UserType } from '../types';
import axios, { AxiosResponse, isCancel, AxiosError } from 'axios';

//const BASE_URL = 'http://localhost:3000'; //this may need to change to IP address
const BASE_URL = 'http://10.0.2.2:3000'; //this is the URL used for android simulator

export const getUser = async (id: number): Promise<UserType> => {
  try {
    const response: AxiosResponse<UserType> = await axios.get(`${BASE_URL}/users/${id}`);
    
    // console.log('getting user:', response.data);
    return response.data;
  } catch (e) {
    console.log('error getting user', e);
    throw e;
  }
};

export const getAllProfiles = async (userId: number): Promise<ProfileType[]> => {
  try {
    const response: AxiosResponse<ProfileType[]> = await axios.get(`${BASE_URL}/users/${userId}/profiles`);
    // console.log('getting all profiles:', response.data)
    return response.data;
} catch (e) {
    console.log('error getting profiles', e);
    throw e;
}
};

// export const getSelectedProfile = async (profileId: number): Promise<ProfileType> => {};

// export const getAllStoriesByProfile = async (profileId: number): Promise<StoryType[]> => {};

export const getSelectedStory = async (storyId: number): Promise<StoryType> => {
  try {
    const response = await axios.get(`${BASE_URL}/stories/${storyId}`);
    console.log('🚀 ~ getStoryById ~ res:', response.data);
    return response.data;
  } catch (error) {
      console.error('Error creating story', error);
      throw error;
  }
};

// export const getFavStories = async (profileId: number): Promise<StoryType[]> => {};

export const createStory = async (
  readingLevel: string,
  location: string,
  readingTime: number,
  themes: string[],
  simpleLanguage: boolean = false,
  words: number[] = [],
) => {
  try {
    const response = await axios.post(`${BASE_URL}/story`, {
      readingLevel,
      location,
      readingTime,
      themes,
      simpleLanguage,
      words,
    });
    return response.data;
  } catch (error) {
      console.error('Error creating story', error);
      throw error;
  }
};
