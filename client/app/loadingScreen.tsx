import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

const gifs = [
  require('../assets/images/hippo.gif'),
  require('../assets/images/angrybird.gif'),
  require('../assets/images/bear.gif'),
  require('../assets/images/flying.gif'),
];

const getRandomGif = () => {
  const randomIndex = Math.floor(Math.random() * gifs.length);
  return gifs[randomIndex];
};

const LoadingScreen = () => {
  const [currentGif, setCurrentGif] = useState(getRandomGif());
  
  return (

    <View className='flex-1 bg-dark-grey justify-center items-center'>
      <Image source={currentGif} style={styles.gif}/>
    </View>
    
  );
};

const styles = StyleSheet.create({
  gif: {
    width: 800,
    height: 800,
  },
});

export default LoadingScreen;