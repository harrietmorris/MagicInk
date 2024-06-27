import { View } from 'react-native';
import React from 'react';
import ProfileForm from '@/components/Profiles/ProfileForm';

const newProfile = () => {
  return (
    <View className='m-8'>
      <ProfileForm />
    </View>
  );
};

export default newProfile;
