import { View } from 'react-native';
import React from 'react';
import ProfileForm from '@/components/Profiles/ProfileForm';

const newProfile = () => {
  return (
    <View className='p-8 flex-1 dark:bg-dark-grey'>
      <ProfileForm />
    </View>
  );
};

export default newProfile;
