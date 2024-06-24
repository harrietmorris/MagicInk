import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDataContext } from '@/context/globalContext';
import { Link } from 'expo-router';

const StoryDetails = () => {
  const dataContext = useDataContext();
  if (!dataContext) return null; //TODO: review null state of dataContext
  const { selectedStory } = dataContext;

  //TODO: setSelectedStory in the storyItem (on submit get story by id)
  return (
    <View>
      {selectedStory ? (
        <>
          <Text>{selectedStory.title}</Text>
          <Text>{selectedStory.storyString}</Text>
        </>
      ) : (
        <Link href='/newStoryScreen'>Create A New Story</Link>
      )}
    </View>
  );
};

export default StoryDetails;
