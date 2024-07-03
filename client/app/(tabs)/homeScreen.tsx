import React from 'react';
import { View} from 'react-native';
import HomeScreen from '@/components/Home/HomeScreen';


const homeScreen = () => {
  return (
    <View className='flex-1 flex-col dark:bg-dark-grey justify-between p-8'> 
        <HomeScreen />
    </View>
  );
};

export default homeScreen;
