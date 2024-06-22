import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

const homeScreen = () => {
  return (
    <View>
      <Text>homeScreen</Text>
      <Link href="/keepReadingScreen">Keep Reading</Link>
    </View>
  )
}

export default homeScreen;