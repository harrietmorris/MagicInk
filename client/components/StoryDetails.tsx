import { Text, ScrollView, SafeAreaView, View } from 'react-native';
import React from 'react';
import { useDataContext } from '@/context/globalContext';
import { router } from 'expo-router';
import FavButton from './buttons/favButton';
import OrangeButton from './style/OrangeButton';
import DeleteStoryBtn from './buttons/DeleteStoryBtn';

const StoryDetails = () => {
  const { selectedStory } = useDataContext();

  //TODO: save selected story to device storage

  return (
    <SafeAreaView className='mx-8 my-20 flex-1'>
      {selectedStory ? (
        <>
          <View className='flex flex-row justify-between mb-5'>
            <DeleteStoryBtn storyId={selectedStory.id} />
            <FavButton storyId={selectedStory.id} />
          </View>
          <Text className='text-3xl mb-5 text-green font-black tracking-tight'>{selectedStory.title}</Text>
          <ScrollView>
            <Text className='text-white text-base'>{selectedStory.storyString}</Text>
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
