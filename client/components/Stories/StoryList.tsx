import { View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import StoryItem from './StoryItem'
import { StoryType } from '@/types';

interface StoryItemProps {
    storyArray: StoryType[] | undefined
    handlePress: (story: StoryType) => void;
    buttonColor: string;
}

const StoryList: React.FC<StoryItemProps> = ({ handlePress, storyArray, buttonColor }) => {

    return (
        <SafeAreaView  >
            <ScrollView horizontal={true} >
                <View className='flex flex-row' >
                    {storyArray && storyArray.map((story) => (
                        <StoryItem story={story} handlePress={handlePress} buttonColor={buttonColor}></StoryItem>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default StoryList