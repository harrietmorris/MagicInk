import { View, Text, StyleSheet, Dimensions, Pressable, ScrollView, SafeAreaView } from 'react-native'
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { getSelectedProfile } from '@/services/apiService';
import { useDataContext } from '@/context/globalContext';
import { StoryType } from '@/types';
import FavButton from '@/components/buttons/favButton';



const HomeStories = () => {
  const screenWidth = Dimensions.get('window').width;
  const squareSize = screenWidth / 2.5;
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
    <SafeAreaView  >
      <ScrollView  horizontal={true} >
        <View className='flex flex-row' >
          {selectedProfile?.storiesList?.map((story) => (
            <Pressable className='w-[140px] h-[140px] bg-yellow aspect-square rounded-lg ml-5 flex items-center justify-center'
              key={story.id}
              onPress={() => handlePress(story)}
            >
              <Text className='font-bold text-base text-white text-center text-lg'>{story.title}</Text>
              <View className='absolute bottom-1 left-1'>
              <FavButton storyId={story.id} />
              </View>
            </Pressable>
          )) || <Text>No stories available</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


export default HomeStories;