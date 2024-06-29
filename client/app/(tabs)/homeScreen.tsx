import React from 'react';
import { View, Text, Pressable } from 'react-native';
import FaveStories from '@/components/Home/FaveStories';
import AllStories from '@/components/Home/AllStories';


const HomeScreen = () => {
  

  return (
    <View className={`flex-1 dark:bg-dark-grey`}>
      <View className="flex flex-col">
        <AllStories />
        <FaveStories />
      </View>
    </View>
  );
};

export default HomeScreen;
