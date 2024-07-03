import { Text, Pressable } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import RenderImage from './RenderImg';

interface ProfileButtonProps {
  route: string;
  profileName: string;
  profileImg: string;
  itemColour: string;
  onPress: () => void;
}

const ProfileButton = ({ route, profileName, profileImg, itemColour, onPress }: ProfileButtonProps) => {
  const router = useRouter();

  const reRouter = () => {
    onPress();
    router.push(route);
  };

  return (
    <Pressable className='flex-row rounded-full p-3 flex items-center justify-around w-60 m-8 h-20' onPress={reRouter} style={{backgroundColor: itemColour}}>
      <RenderImage imageUrl={profileImg} style={{ width: 55, height: 55, borderRadius: 55 }} />
      <Text className='text-grey text-3xl font-bold'>{profileName}</Text>
    </Pressable>
  );
};

export default ProfileButton;
