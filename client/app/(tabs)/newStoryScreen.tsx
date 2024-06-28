import NewStory from '@/components/NewStory';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

export default function newStoryScreen() {
  return (
    <View className='flex-col justify-around flex-1 items-center py-10 bg-dark-grey'>
      <NewStory />
    </View>
  );
}
