import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StoryType } from '@/types';
import FavButton from '../buttons/favButton';
import DeleteStoryBtn from '../buttons/DeleteStoryBtn';
import { getStoryImage } from '../../services/apiStoryImage';
import { LinearGradient } from 'expo-linear-gradient';

interface StoryItemProps {
  story: StoryType;
  handlePress: (story: StoryType) => void;
  buttonColor: string;
}

const StoryItem = ({ story, handlePress, buttonColor }: StoryItemProps) => {
  const [imageURL, setImageURL] = useState<string>();

  useEffect(() => {
    if (story.id) {
      (async () => {
        const result = await getStoryImage(story.id);
        setImageURL(result);
      })();
    }
  }, []);

  return (
    <View className='pr-8'>
      <Pressable
        className={`w-[220px] h-[220px]
          } aspect-square rounded-lg  flex justify-end`}
        onPress={() => handlePress(story)}
      >
        <Image
          source={{
            uri: imageURL,
          }}
          className='rounded-lg'
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <View className=' rounded-b-lg text-lg font-black text-center'>
          <LinearGradient
            className='rounded-b-lg pt-10'
            colors={['transparent', '#4682B4']}
          >
            <Text className='text-white rounded-b-lg text-lg font-black text-center px-2'>{story.title}</Text>
          </LinearGradient>
        </View>
        <View className='absolute top-2 left-2 bg-white/[0.6] items-center justify-center rounded-full w-8 h-8' >
          <DeleteStoryBtn storyId={story.id} />
        </View>
        <View className='absolute top-2 right-2 bg-grey/[0.6] items-center justify-center rounded-full w-8 h-8' >
          <FavButton storyId={story.id} />
        </View>
      </Pressable>
    </View>
  );
};

export default StoryItem;
