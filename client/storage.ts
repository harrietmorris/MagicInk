import { MMKV } from 'react-native-mmkv'
import { StoryType } from './types';

const storage = new MMKV();

export const saveLastReadLocation = (profileId: number, storyId: number, location: number) => {
  const locations = storage.getString('locations');
  const locationsObject = locations ? JSON.parse(locations) : {};
  const profileLocations = locationsObject[profileId] || {};
  profileLocations[storyId] = location;
  locationsObject[profileId] = profileLocations;
  storage.set('locations', JSON.stringify(locationsObject));
};

export const getLastReadLocation = (profileId: number, storyId: number) => {
  const locations = storage.getString('locations');
  if (locations) {
    const locationsObject = JSON.parse(locations);
    const profileLocations = locationsObject[profileId] || {};
    return profileLocations[storyId] || null;
  }
  return null;
};

export const saveStory = (story: StoryType) => {
  const key = `story_${story.id}`;
  if (storage.contains(key)) return;
  storage.set(key, JSON.stringify(story));
};

export const getStory = (storyId: number) => {
  const key = `story_${storyId}`;
  const story = storage.getString(key);
  return story ? JSON.parse(story) : null;
};