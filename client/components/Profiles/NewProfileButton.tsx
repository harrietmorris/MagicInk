import { ViewStyle, TextStyle, TouchableOpacity, StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

interface NewProfileButtonProps {
  route: string;
}

function NewProfileButton({ route }: NewProfileButtonProps) {
  const router = useRouter();

  const reRouter = () => {
    router.push(route);
  };

  return (
    <Pressable
      className='bg-dark-orange rounded-full px-4 py-4 flex items-center justify-center w-60 m-8'
      onPress={reRouter}
    >
      <Text className='text-white text-3xl font-bold'>+ New Profile</Text>
    </Pressable>
  );
}

export default NewProfileButton;
