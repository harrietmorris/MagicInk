import { Text } from 'react-native'
import { useRouter } from 'expo-router';
import { useDataContext } from '@/context/globalContext';
import { StoryType } from '@/types';
import React from 'react'
import StoryList from '../Stories/StoryList';

const FaveStories = () => {

  const router = useRouter()
  const { selectedProfile, setSelectedStory } = useDataContext();

  function handlePress(story: StoryType) {
    setSelectedStory(story)
    router.push("/keepReadingScreen")
  }

  return (
    (selectedProfile.favs && selectedProfile.favs.length > 0 ?
      <StoryList handlePress={handlePress} storyArray={selectedProfile.favs} buttonColor={'dark-orange'}></StoryList> :
      <Text className='text-dark-orange text-3xl font-bold mt-3 mb-4 text-center'>No stories available</Text>)
  )
}




export default FaveStories