import { ProfileType, StoryType, UserType } from '../types';
import axios, { AxiosResponse, isCancel, AxiosError } from 'axios';

const BASE_URL = 'http://localhost:3000'; //this may need to change to IP address
// const BASE_URL = ‘http://10.0.2.2:3000’; //this is the URL used for android simulator

export const getUser = async (id: number): Promise<UserType> => {
  try {
    const response: AxiosResponse<UserType> = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data;
  } catch (e) {
    console.error('error getting user', e);
    throw e;
  }
};

export const getAllProfiles = async (userId: number): Promise<ProfileType[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}/profiles`);
    console.log('getting profiles:', response.data);
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

export const getAllStoriesByProfile = async (profileId: number): Promise<StoryType[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/profiles/${profileId}/storiesList`);
    console.log('all stories by profile:', response.data)
    return response.data
  }
  catch (e) {
    console.error('Error getting stories by profile', e);
    throw e;
  }
}

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
