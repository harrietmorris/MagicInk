import { Text, Pressable } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

interface ProfileButtonProps {
  route: string;
  profileName: string;
  onPress: () => void;
}

const ProfileButton = ({ route, profileName, onPress }: ProfileButtonProps) => {
  const router = useRouter();

  const reRouter = () => {
    onPress();
    router.push(route);
  };

  return (
    <Pressable className='bg-blue rounded-full px-4 py-4 flex items-center justify-center w-60 m-8' onPress={reRouter}>
      <Text className='text-white text-3xl font-bold'>{profileName}</Text>
    </Pressable>
  );
};

export default ProfileButton;
