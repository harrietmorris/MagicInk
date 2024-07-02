import { View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import StoryItem from './StoryItem'
import { StoryType } from '@/types';
import { useDataContext } from '@/context/globalContext';
import { useRouter } from 'expo-router';

interface StoryItemProps {
    storyArray: StoryType[] | undefined
    color: string | null;
}

const StoryList = ({ storyArray, color }: StoryItemProps) => {

    const {setSelectedStory} = useDataContext()
    const router = useRouter()
    const colors = ['yellow', 'light-orange', 'blue']

    function handlePress(story: StoryType) {
        setSelectedStory(story)
        router.push("/keepReadingScreen")
      }

    return (
        <SafeAreaView  >
            <ScrollView horizontal={true} >
                <View className='flex flex-row' >
                    {storyArray && storyArray.map((story, index) => {
                      let buttonColor;
                      if (!color) buttonColor = colors[index % 3];
                      else buttonColor = color;
                      return <StoryItem key={story.id} story={story} handlePress={handlePress} buttonColor={buttonColor}></StoryItem>
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default StoryList