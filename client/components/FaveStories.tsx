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
              <Text className={`text-base text-black text-center text-lg`}>{story.title}</Text>
            </Pressable>
          )) || <Text>No stories available</Text>}
       </View>
      </ScrollView>
    </SafeAreaView>
      )
    }




//AI generated styling just for testing
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'row', // Arrange buttons horizontally
//         flexWrap: 'wrap', // Wrap buttons to multiple lines if needed
//         justifyContent: 'space-around', // Distribute buttons evenly
//         alignItems: 'center',
//     },
//     square: {
//         backgroundColor: '#add8e6', // Change background color as desired
//         borderRadius: 5,
//         margin: 10, // Adjust margin for spacing
//         justifyContent: 'center', // Center text vertically
//         alignItems: 'center', // Center text horizontally
//     },
//     text: {
//         fontSize: 16, // Adjust font size as desired
//         color: '#000', // Text color
//     },
// });

export default FaveStories