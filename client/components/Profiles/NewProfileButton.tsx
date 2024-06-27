import { ViewStyle, TextStyle, TouchableOpacity, StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface NewProfileButtonProps {
  route: string;
}

function NewProfileButton({ route }: NewProfileButtonProps) {
  const router = useRouter();

  const reRouter = () => {
    router.push(route);
  };

  return (
    <Pressable className='bg-dark-orange p-3 rounded-full' onPress={reRouter}>
      <Text className='text-2xl text-white'>New Profile</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    // backgroundColor: '#000000',
    // padding: 10,
    // borderRadius: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    // color: '#fff',
    // fontSize: 16,
  },
});

export default NewProfileButton;
