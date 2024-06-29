import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { StoryType } from '@/types';
import FavButton from '../buttons/favButton';

interface StoryItemProps {
    story: StoryType;
    handlePress: (story: StoryType) => void;
    buttonColor: string;
}

const StoryItem= ({ story, handlePress, buttonColor } :StoryItemProps) => {


    return (
        <View>
            <Pressable className={`w-[140px] h-[140px] bg-${buttonColor} aspect-square rounded-lg ml-5 flex items-center justify-center`}
                key={story.id}
                onPress={() => handlePress(story)} >
                <Text className='text-base text-black text-center text-lg'>{story.title}</Text>
                <View className='absolute bottom-1 left-1'>
                    <FavButton storyId={story.id} />
                </View>
            </Pressable>
        </View>
    )
}

export default StoryItem