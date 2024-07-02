import { Text, ScrollView, SafeAreaView, View } from 'react-native';
import React from 'react';
import { useDataContext } from '@/context/globalContext';
import { router } from 'expo-router';
import FavButton from './buttons/favButton';
import OrangeButton from './style/OrangeButton';
import DeleteStoryBtn from './buttons/DeleteStoryBtn';
import { updateStory } from '@/services/apiService';

const StoryDetails = () => {
  //TODO: save selected story to device storage
  const { selectedStory, selectedProfile, setSelectedStory } = useDataContext();
  if (!selectedStory) {
    router.replace('/newStoryScreen');
    return;
  }
  let storyText = selectedStory.storyString.replaceAll('*','');
  let lastOptions: string[] = [];
  if (selectedStory.chooseYourStory) {
    const options = storyText.match(/(\d:.+)/g) || []
    if (options.length > 0) {
      lastOptions = options.slice(-3)
      lastOptions.forEach(option => {
      storyText = storyText.replace(option, '')})
    }
  }
  async function continueStory(option: string) {
    if(!selectedProfile || !selectedStory) {
      return;
    }
  router.replace('/loadingScreen');
  const optionNumber = option.split(':')[0];
  const response = await updateStory(selectedProfile?.id, selectedStory.id, optionNumber);
  const storyDetails = response?.storyDetails;
  setSelectedStory(storyDetails);
  router.replace('/keepReadingScreen');
}


  return (
    <SafeAreaView className='mx-8 mt-20 flex-1'>
      {selectedStory ? (
        <>
          <View className='flex flex-row justify-between mb-5'>
            <DeleteStoryBtn storyId={selectedStory.id} />
            <FavButton storyId={selectedStory.id} />
          </View>
          <Text className='text-3xl mb-5 text-green font-black tracking-tight'>{selectedStory.title}</Text>
          <ScrollView>
            <Text className='text-black dark:text-white text-base'>{storyText}</Text>
          { selectedStory.chooseYourStory
          && selectedStory.currentBreakpoint < selectedStory.breakpoints
          && lastOptions.map((option) => (
            <View className='p-1'>
              <OrangeButton title={option} onPress={() => {continueStory(option);}} />
            </View>
          ))}
          </ScrollView>
        </>
      ) : (
        <View className='flex-1 justify-center items-center'>
          <OrangeButton
            onPress={() => {
              router.replace('/newStoryScreen');
            }}
            title='Create a new story!'
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default StoryDetails;
