import { View } from 'react-native'
import React from 'react'
import OrangeButton from '../style/OrangeButton'
import { router } from 'expo-router';

const LogOutButton = () => {
 
    function handleLogout () {
        // TODO: Implement logout logic
        router.replace('/loginScreen');
      }

  return (
    <View className='px-2.5'>
      <OrangeButton title="Logout" onPress={handleLogout}/>
    </View>
  )
}

export default LogOutButton;