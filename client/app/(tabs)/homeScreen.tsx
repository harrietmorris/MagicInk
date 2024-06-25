import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Link } from 'expo-router';
import { getAllProfiles, getSelectedProfile, getUser } from '@/services/apiService';
import { useDataContext } from '@/context/globalContext';

const homeScreen = () => {
  const { setUser, setSelectedProfile, setProfiles } = useDataContext();
  // TODO: remove this one authentication is implemented
  useEffect(() => {
    async function setup() {
      const user = await getUser(1);
      setUser(user);
      const profiles = await getAllProfiles(user.id);
      setProfiles(profiles);
      setSelectedProfile(profiles[0]);
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