import { ProfileType, StoryType, UserType } from '../Types';
import axios, { AxiosResponse, isCancel, AxiosError } from 'axios';

const BASE_URL = 'http://localhost:3000'; //this may need to change to IP address

export const axiosUser = async (id: number): Promise<UserType> => {
  try {
    const response: AxiosResponse<UserType> = await axios.get(`${BASE_URL}/users/${id}`);
    console.log('getting user:', response.data);
    return response.data;
  } catch (e) {
    console.log('error getting user', e);
    throw e;
  }
};

// export const axiosAllProfiles = async (userId: number): Promise<ProfileType[]> => {};

// export const axiosSelectedProfile = async (profileId: number): Promise<ProfileType> => {};

// export const axiosStoriesByProfile = async (profileId: number): Promise<StoryType[]> => {};

export const axiosSelectedStory = async (storyId: number): Promise<StoryType> => {
  try {
    const response = await axios.get(`${BASE_URL}/stories/${storyId}`);
    console.log('🚀 ~ getStoryById ~ res:', response.data);
    return response.data;
  } catch (error) {
      console.error('Error creating story', error);
      throw error;
  }
};

// export const axiosFavStories = async (profileId: number): Promise<StoryType[]> => {};

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
