import { StyleSheet, View } from 'react-native';
import React from 'react';
import NewProfileButton from '../components/Profiles/NewProfileButton';
import ListedProfiles from '@/components/Profiles/ListedProfiles';

const profilesScreen = () => {
  return (
    <View className='flex-1 flex-col items-center justify-center'>
      <NewProfileButton route='/newProfileScreen' />
      <ListedProfiles />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    // fontSize: 24,
    // marginBottom: 20,
  },
  buttonStyle: {
    // backgroundColor: '#28a745',
    // padding: 15,
  },
  textStyle: {
    // fontSize: 18,
    // fontWeight: 'bold',
  },
});

export default profilesScreen;
