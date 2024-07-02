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
    <View className=''>
    <View className='m-8'>
      <Text className='text-green text-3xl font-bold'>{selectedProfile.name},</Text>
      <Text className='dark:text-white text-3xl font-bold'>Ready To Make Magic?</Text>
    </View>
    <Text className='dark:text-white text-xl font-bold mb-4 mt-3 text-left mx-8'>All Stories</Text>
    <View>
        {selectedProfile.storiesList && selectedProfile.storiesList.length > 0 ? (
          <StoryList storyArray={selectedProfile.storiesList} color={null}/>
        ) : (
          <View className='flex mx-8 my-20 items-center'>
            <OrangeButton title='Create a new story' onPress={() => router.push('/newStoryScreen')}/>
          </View>
        )}
    </View>
    <Text className='dark:text-white text-xl font-bold mt-3 mb-4 text-left mx-8'>My Favorites</Text>
    <View>
        {selectedProfile.favs && selectedProfile.favs.length> 0 ? (
          <StoryList storyArray={selectedProfile.favs} color="green" />
        ) : (
          <Text className="dark:text-white text-lg text-center mx-8 my-20">Click on the ❤️ to add a story to your favorites</Text>
        )}
    </View>
    </View>
  )
}

export default HomeScreen;