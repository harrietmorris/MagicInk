import { View, Text, StyleSheet, Dimensions, Pressable, ScrollView, SafeAreaView } from 'react-native'
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { getSelectedProfile } from '@/services/apiService';
import { useDataContext } from '@/context/globalContext';
import { StoryType } from '@/types';
import StoryList from './Stories/StoryList';



const AllStories = () => {

  const router = useRouter()

  const { setSelectedStory, setSelectedProfile, selectedProfile, selectedStory } = useDataContext();

  useEffect(() => {
    const fetchProfile = async () => {
      if (selectedProfile) {
        const updatedProfile = await getSelectedProfile(selectedProfile.id);
        setSelectedProfile(updatedProfile);
      }
    }
    fetchProfile();
  }, [selectedStory, selectedProfile?.id]);

  function handlePress(story: StoryType) {
    setSelectedStory(story)
    router.push("/keepReadingScreen")
  }

  return (
    (selectedProfile.storiesList && selectedProfile.storiesList.length > 0 ?
      <StoryList handlePress={handlePress} storyArray={selectedProfile.storiesList} buttonColor={'yellow'}></StoryList> :
      <Text className='text-dark-orange text-3xl font-bold mt-3 mb-4 text-center'>No stories available</Text>)
  )
}

export default AllStories;