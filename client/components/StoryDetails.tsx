import { Text, ScrollView, SafeAreaView, View } from 'react-native';
import React from 'react';
import { useDataContext } from '@/context/globalContext';
import { router } from 'expo-router';
import FavButton from './buttons/favButton';
import OrangeButton from './style/OrangeButton';
import DeleteStoryBtn from './buttons/DeleteStoryBtn';

const StoryDetails = () => {
  //TODO: save selected story to device storage
  const { selectedStory } = useDataContext();
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
          { selectedStory.chooseYourStory && lastOptions.map((option) => (
            <View className='p-1'>
              <OrangeButton title={option} onPress={() => {console.log(option);}} />
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
