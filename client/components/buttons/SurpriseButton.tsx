import React from 'react';
import { useDataContext } from '@/context/globalContext';
import { createImage, createStory } from '@/services/apiService';
import { themeOptions, locationOptions, readingTimeOptions } from '../../constants/Surprise';
import { router } from 'expo-router';
import OrangeButton from '../style/OrangeButton';
import { storeStoryImage } from '../../services/apiStoryImage';
import { createAndStoreStoryImage } from '../utils/StoreGetStoryImage';

const SurpriseButton = () => {
  const { setSelectedStory, selectedProfile } = useDataContext();

  const handleSuprise = async () => {
    if (!selectedProfile) return;

    const readingLevels = selectedProfile.readingLevel;
    const randomLocation = locationOptions[Math.floor(Math.random() * locationOptions.length)];
    const readingTimes = Object.keys(readingTimeOptions);
    const randomReadingTime = readingTimes[Math.floor(Math.random() * readingTimes.length)];

    // Pick two random themes that are not the same
    const randomThemes = [themeOptions[Math.floor(Math.random() * themeOptions.length)]];
    let randomTheme = themeOptions[Math.floor(Math.random() * themeOptions.length)];
    while (randomThemes.includes(randomTheme)) {
      randomTheme = themeOptions[Math.floor(Math.random() * themeOptions.length)];
    }
    randomThemes.push(randomTheme);

    router.replace('/loadingScreen');

    const profId = selectedProfile?.id ? selectedProfile.id : 1;

    const promiseStory = createStory(
      profId,
      readingLevels,
      randomLocation,
      readingTimeOptions[randomReadingTime],
      randomThemes.join(', '),
    );
    const promiseImage = createImage(readingLevels, randomLocation, randomThemes.join(', '));
    const [{ storyDetails }, image_url] = await Promise.all([promiseStory, promiseImage]);

    setSelectedStory(storyDetails);
    router.replace('/keepReadingScreen');

    const filename = `${storyDetails.id}.jpeg`;
    await storeStoryImage(image_url, filename);
  };

  return <OrangeButton title='Surprise Me!' onPress={handleSuprise} />;
};

export default SurpriseButton;
