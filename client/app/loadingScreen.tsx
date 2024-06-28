import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';


const LoadingScreen = () => {
  return (

    <View className='flex-1 bg-dark-grey justify-center items-center'>
      <Image source={require('../assets/images/bear.gif')} style={styles.gif}/>
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