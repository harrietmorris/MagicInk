import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { getUser, loginUser } from '@/services/apiService';
import { useDataContext } from '@/context/globalContext';
import { UserType } from '@/types';

const defaultUser: UserType = {
  id: '123',
  name: 'Jane Doe',
  email: 'example@email.com',
  familyName: 'Doe',
  givenName: 'Jane',
  photo: null,
};

const BypassLoginButton = () => {
  const { setUser } = useDataContext();

  const handleLoginUser = async () => {
    const userInfo = await loginUser(defaultUser);
    setUser(userInfo);
    router.replace('/profilesScreen');
  };

  return (
    <Pressable style={styles.button} onPress={handleLoginUser}>
      <Text style={styles.text}>Login with Default User</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BypassLoginButton;
