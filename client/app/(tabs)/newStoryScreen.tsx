import NewStory from '@/components/NewStory';
import { View } from 'react-native';

export default function newStoryScreen() {
  return (
    <View className='flex-1 flex-col dark:bg-dark-grey justify-between p-8'>
      <NewStory />
    </View>
  );
}
