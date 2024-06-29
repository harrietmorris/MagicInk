import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { StoryType } from '@/types';
import FavButton from '../buttons/favButton';
import DeleteStoryBtn from '../buttons/DeleteStoryBtn';
import { styled } from 'nativewind';

interface StoryItemProps {
  story: StoryType;
  handlePress: (story: StoryType) => void;
  buttonColor: string;
}

const StyledPressable = styled(Pressable);
const StyledView = styled(View);

const StoryItem = ({ story, handlePress, buttonColor }: StoryItemProps) => {
  return (
    <View>
      <StyledPressable
        className={`w-[200px] h-[200px] bg-${buttonColor} aspect-square rounded-lg ml-5 p-2 flex items-center justify-center`}
        onPress={() => handlePress(story)}
      >
        <Text className='text-base text-black text-center text-lg font-bold'>{story.title}</Text>
        <StyledView className='absolute top-2 left-2'>
          <DeleteStoryBtn storyId={story.id} />
        </StyledView>
        <View className='absolute top-2 right-2'>
          <FavButton storyId={story.id} />
        </View>
      </StyledPressable>
    </View>
  );
};

export default StoryItem;
