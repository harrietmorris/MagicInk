import NewStory from '@/components/NewStory';
import { View } from 'react-native';

export default function newStoryScreen() {
  return (
    <View className='flex flex-col justify-around flex-1 items-center py-10 dark:bg-dark-grey'>
      <NewStory />
    </View>
  );
}
