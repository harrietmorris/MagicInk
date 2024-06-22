import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const profilesScreen = () => {
  return (
    <View>
      <Link href='/newProfileScreen'>Create New Profile</Link>
      <Link href='/homeScreen'>Profile 1</Link>
    </View>
  );
}

export default profilesScreen