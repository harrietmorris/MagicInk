import { Text, ScrollView, SafeAreaView, View } from 'react-native';
import React from 'react';
import { useDataContext } from '@/context/globalContext';
import { router } from 'expo-router';
import FavButton from './buttons/favButton';
import OrangeButton from './style/OrangeButton';


const StoryDetails = () => {
  const { selectedStory } = useDataContext();

  //TODO: save selected story to device storage

  return (
    <SafeAreaView className='mx-8 my-10  flex-1'>
      {selectedStory ? (
        <>
          <ScrollView>
            <Text className='text-3xl mb-10 text-green font-black tracking-tight'>{selectedStory.title}</Text>
            <Text className='text-white text-base'>{selectedStory.storyString}</Text>
            <FavButton storyId={selectedStory.id} />
          </ScrollView>
        </>
      ) : (
        <View className='flex-1 justify-center items-center'>
          <OrangeButton onPress={() => {router.replace('/newStoryScreen')}} title='Create a new story!' />
        </View>
      )}
    </SafeAreaView>
  );
};


export default StoryDetails;
