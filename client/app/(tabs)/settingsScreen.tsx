import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const settingsScreen = () => {
  return (
    <View>
      <Text>settingsScreen</Text>
      <Link href='/loginScreen'>Logout</Link>
    </View>
  )
}

export default settingsScreen