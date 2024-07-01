import { View, Text } from 'react-native'
import { useEffect } from 'react';
import { getSelectedProfile } from '@/services/apiService';
import { useDataContext } from '@/context/globalContext';
import StoryList from '../Stories/StoryList';
import { useRouter } from 'expo-router';
import OrangeButton from '../style/OrangeButton';



const HomeScreen = () => {
  const router = useRouter()
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


  return (
    // (selectedProfile.storiesList && selectedProfile.storiesList.length > 0 ?
    <View className=''>
    <View className='m-8'>
      <Text className='text-green text-3xl font-bold'>{selectedProfile.name},</Text>
      <Text className='text-white text-3xl font-bold'>Ready To Make Magic?</Text>
    </View>
    <Text className='text-white text-xl font-bold mb-4 mt-3 text-left mx-8'>All Stories</Text>
      <View>
        <StoryList storyArray={selectedProfile.storiesList} buttonColor={'yellow'}></StoryList>
      </View> 
    <Text className='text-white text-xl font-bold mt-3 mb-4 text-left mx-8'>My Favorites</Text>
    <View>
        <StoryList storyArray={selectedProfile.favs} buttonColor={'dark-orange'}></StoryList>
      </View>
    </View>
      // <OrangeButton onPress={() => router.push("./newStoryScreen")} title={'Add Story'} />)
  )
}

export default HomeScreen;