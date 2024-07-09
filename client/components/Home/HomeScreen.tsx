import { View, Text } from 'react-native';
import { useEffect } from 'react';
import { getSelectedProfile } from '@/services/apiService';
import { useDataContext } from '@/context/globalContext';
import StoryList from '../Stories/StoryList';
import { useRouter } from 'expo-router';
import OrangeButton from '../style/OrangeButton';

const HomeScreen = () => {
  const router = useRouter();
  const { setSelectedProfile, selectedProfile, selectedStory } = useDataContext();

  if (!selectedProfile) {
    return;
  }
  useEffect(() => {
    const fetchProfile = async () => {
      if (selectedProfile) {
        const updatedProfile = await getSelectedProfile(selectedProfile.id);
        setSelectedProfile(updatedProfile);
      }
    };
    fetchProfile();
  }, [selectedStory, selectedProfile?.id]);

  return (
    <>
    <View className='flex flex-col'>
      <View className='mb-8 mt-6'>
        <Text className='tracking-tighter dark:text-green text-green text-3xl font-black'>
          {selectedProfile.name},
        </Text>
        <Text className='tracking-tighter dark:text-white text-3xl font-black'>Ready To Make Magic?</Text>
      </View>

      <View className='mb-6'>
        <Text className='dark:text-white text-xl font-bold text-left mb-3'>All Stories</Text>
          {selectedProfile.storiesList && selectedProfile.storiesList.length > 0 ? (
            <StoryList storyArray={selectedProfile.storiesList} color={null} />
          ) : (
            <View className='mt-14 mb-14 items-center'>
              <OrangeButton title='Create a new story' onPress={() => router.push('/newStoryScreen')} />
            </View>
          )}
      </View>
      
      <View className='mb-6'>
        <Text className='dark:text-white text-xl font-bold text-left mb-3'>My Favorites</Text>
        {selectedProfile.favs && selectedProfile.favs.length > 0 ? (
          <StoryList storyArray={selectedProfile.favs} color='green' />
        ) : (
          <Text className='dark:text-white text-lg text-center mt-14'>Click on the ❤️ to add a story to your favorites</Text>
        )}
      </View>
    </View>
    </>
  );
};

export default HomeScreen;
