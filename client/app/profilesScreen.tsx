import { View } from 'react-native';
import React from 'react';
import NewProfileButton from '../components/Profiles/NewProfileButton';
import ListedProfiles from '@/components/Profiles/ListedProfiles';

const profilesScreen = () => {
  return (
    <View className='flex-1 flex-col items-center justify-center m-5'>
      <NewProfileButton route='/newProfileScreen' />
      <ListedProfiles />
    </View>
  );
};

export default profilesScreen;
