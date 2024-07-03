import { View, Text, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StoryType } from '@/types';
import FavButton from '../buttons/favButton';
import DeleteStoryBtn from '../buttons/DeleteStoryBtn';
import { getStoryImage } from '../../services/apiStoryImage';

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
    <View>
      <Pressable
        // TODO: fix this hack to get light-orange to work
        className={`w-[200px] h-[200px]
          } aspect-square rounded-lg ml-5 p-2 flex items-center justify-center`}
        onPress={() => handlePress(story)}
      >
        <Image
          source={{
            uri: imageURL,
          }}
          className='rounded-lg'
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
        />
        <Text className='text-base text-black text-center text-lg font-bold bg-white'>{story.title}</Text>
        <View className='absolute top-2 left-2'>
          <DeleteStoryBtn storyId={story.id} />
        </View>
        <View className='absolute top-2 right-2'>
          <FavButton storyId={story.id} />
        </View>
      </Pressable>
    </View>
  );
};

export default StoryItem;
