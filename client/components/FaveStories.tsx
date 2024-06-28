import { View, Text, StyleSheet, Dimensions, Pressable, ScrollView, SafeAreaView } from 'react-native'
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { getSelectedProfile } from '@/services/apiService';
import { useDataContext } from '@/context/globalContext';
import { StoryType } from '@/types';
import React from 'react'

const FaveStories = () => {


    const router = useRouter()
  const { selectedProfile,setSelectedStory } = useDataContext();
  function handlePress(story: StoryType) {
    setSelectedStory(story)
    router.push("/keepReadingScreen")
  }

  return (
    <SafeAreaView  >
      <ScrollView horizontal={true} >
        <View className='flex flex-row' >
          {selectedProfile?.favs?.map((story) => (
            <Pressable
            className='w-[140px] h-[140px] bg-dark-orange aspect-square rounded-lg ml-5 flex items-center justify-center'
              key={story.id}
            onPress={() => handlePress(story)}
            >
              <Text className={`font-bold text-base text-white text-center text-lg`}>{story.title}</Text>
            </Pressable>
          )) || <Text>No stories available</Text>}
       </View>
      </ScrollView>
    </SafeAreaView>
      )
    }

export default FaveStories