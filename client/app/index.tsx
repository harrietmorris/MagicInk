import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useDataContext } from '@/context/globalContext';
import { loginUser } from '@/services/apiService';
import BypassLoginButton from '@/components/BypassLoginButton';

const index = () => {
  const { user, setUser } = useDataContext();

  const configGoogleSignIn = () => {
    //TODO: review how to use androidClientId instead of builtin webClientId
    GoogleSignin.configure({
      webClientId: process.env.WEB_CLIENT_ID,
      // androidClientId: process.env.ANDROID_CLIENT_ID,
      // iosClientId: process.env.ANDROID_CLIENT_ID,
    });
  };

  useEffect(() => {
    configGoogleSignIn();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userResult = await GoogleSignin.signIn();
      const userInfo = await loginUser(userResult.user);
      setUser(userInfo);
    } catch (err) {
      //TODO: Add errors based on react-native-google status codes
      console.log('Error', err);
    }
  };

  //TODO: implement: checkIfUserIsValid -> GoogleSignin.signInSilently();

  //TODO: remove logout once dev complete
  const handleLogout = () => {
    setUser(undefined);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Redirect href='/profilesScreen'></Redirect>
        </>
      ) : (
        <>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Light}
            onPress={signIn}
          />
          {/* <BypassLoginButton /> */}
          <Pressable onPress={handleLogout}>
            <Text>Logout</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default index;
