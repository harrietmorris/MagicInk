import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useDataContext } from '@/context/globalContext';
import { loginUser } from '@/services/apiService';


const index = () => {
  const { user, setUser } = useDataContext();

  const configGoogleSignIn = () => {
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
      console.log("🚀 ~ signIn ~ userResult:", userResult)

      const userInfo = await loginUser(userResult.user);
      setUser(userInfo);
    } catch (err) {
      //TODO: Add errors based on react-native-google status codes
      console.log('Error', err);
    }
  };

  //TODO: implement: checkIfUserIsValid -> GoogleSignin.signInSilently();

  //TODO: move this functionality to the profile/ settings page & Logout button
  const logout = () => {
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
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Light}
          onPress={signIn}
        />
      )}
      <Pressable onPress={logout}>
        <Text>Logout</Text>
      </Pressable>
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
