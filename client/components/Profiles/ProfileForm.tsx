import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDataContext } from '@/context/globalContext'
import { readingLevelOptions } from '@/constants'


const ProfileForm = () => {
    const {profiles, setProfiles, setSelectedProfile} = useDataContext();

    useEffect(() => {

    })
  return (
    <View>
      <Text>ProfileForm</Text>
    </View>
  )
}

export default ProfileForm