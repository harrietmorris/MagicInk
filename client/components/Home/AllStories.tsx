import { View, Text } from 'react-native'
import { useEffect } from 'react';
import { getSelectedProfile } from '@/services/apiService';
import { useDataContext } from '@/context/globalContext';
import StoryList from '../Stories/StoryList';
import { useRouter } from 'expo-router';
import OrangeButton from '../style/OrangeButton';



const AllStories = () => {

  const { setSelectedProfile, selectedProfile, selectedStory } = useDataContext();

  if (!selectedProfile){
    return
  }
  useEffect(() => {
    const fetchProfile = async () => {
      if (selectedProfile) {
        const updatedProfile = await getSelectedProfile(selectedProfile.id);
        setSelectedProfile(updatedProfile);
      }

    }
    fetchProfile();
  }, [selectedStory, selectedProfile?.id]);

  const router = useRouter()

  return (
    (selectedProfile.storiesList && selectedProfile.storiesList.length > 0 ?
      <View>
        <Text className='text-green text-3xl font-bold mb-4 mt-3 text-center'>All Stories</Text>
        <StoryList storyArray={selectedProfile.storiesList} buttonColor={'yellow'}></StoryList>
      </View> :
      <OrangeButton onPress={() => router.push("./newStoryScreen")} title={'Add Story'} />)
  )
}

export default AllStories;