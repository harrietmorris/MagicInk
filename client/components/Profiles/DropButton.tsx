import { Text, Pressable, Image, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { profilePictures } from '@/constants/profilePictures';

interface DropButtonProps {
  route: string;
  profileName: string;
  profilePic: string;
  onPress: () => void;
}

const DropButton = ({ route, profileName, onPress, profilePic }: DropButtonProps) => {
  const router = useRouter();

  const reRouter = () => {
    onPress();
    router.push(route);
  };

  return (
    <Pressable className=' flex-row-reverse items-center justify-between' onPress={reRouter}>
    <View className='p-2.5 items-center justify-center'>
        <Image
                className='w-[50px] h-[50px]'
                source={profilePictures.filter((pic) => pic.id === profilePic)[0].src}
              />
    </View>
    <Text className='text-white text-lg font-bold px-10' numberOfLines={1} adjustsFontSizeToFit={true}>{profileName}</Text>
  </Pressable>
  );
};

export default DropButton;
