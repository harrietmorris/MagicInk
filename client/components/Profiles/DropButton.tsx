import { Text, Pressable, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import RenderImage from './RenderImg';


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
    <Pressable className='flex-row-reverse items-center justify-between' onPress={reRouter}>
    <View className='p-2.5 items-center justify-center'>
      <RenderImage
        imageUrl={profilePic}
        style={{ width: 50, height: 50, borderRadius: 50 }}
      />
    </View>
    <Text className='text-white text-lg font-bold px-10' numberOfLines={1} adjustsFontSizeToFit={true}>
      {profileName}
    </Text>
  </Pressable>
  );
};

export default DropButton;
