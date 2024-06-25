import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Link } from 'expo-router';
import { getSelectedProfile, getUser } from '@/services/apiService';
import { useDataContext } from '@/context/globalContext';

const homeScreen = () => {
  const { setUser, setSelectedProfile } = useDataContext();
  // TODO: remove this one authentication is implemented
  useEffect(() => {
    async function setup() {
      const user = await getUser(1);
      setUser(user);
      const profile = await getSelectedProfile(1);
      setSelectedProfile(profile);
      console.log('user:', user);
      console.log('profile:', profile);
    }
    setup();
  }, [])

  return (
    <View>
      <Text>homeScreen</Text>
      <Link href="/keepReadingScreen">Keep Reading</Link>
    </View>
  )
}

export default homeScreen;