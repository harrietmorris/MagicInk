import React from 'react';
import { View} from 'react-native';
import HomeScreen from '@/components/Home/HomeScreen';


const homeScreen = () => {
  return (
    <View className={`flex flex-col flex-1 dark:bg-dark-grey`}> 
        <HomeScreen />
    </View>
  );
};

export default homeScreen;
