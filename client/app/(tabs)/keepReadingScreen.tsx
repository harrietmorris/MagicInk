import { View, Text } from 'react-native'
import React from 'react'
import StoryDetails from '@/components/StoryDetails'


const keepReadingScreen = () => {
  return (
    <View className='h-full bg-dark-grey'>
      <StoryDetails />
    </View>
  )
}

export default keepReadingScreen