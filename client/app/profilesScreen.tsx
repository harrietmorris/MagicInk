import { View, Text, StyleSheet, SafeAreaView} from 'react-native'
import React, { useEffect } from 'react'
import { Link, router } from 'expo-router'
import NewProfileButton from '../components/Profiles/NewProfileButton'
import { useDataContext } from '../context/DataContext';



const profilesScreen = () => {
  const {user, profiles, setSelectedProfile, getUser, getAllProfiles } = useDataContext();

  useEffect(() => {
    getAllProfiles(user.id);
}, []);

const ProfilePress = (profile) => {
  setSelectedProfile(profile);
  router.push('/homeScreen'); 
};


  return (
    <SafeAreaView style={styles.container}>
      < NewProfileButton 
        route="/newProfileScreen"
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textStyle} />

  
      <Link href='/homeScreen'>Profile 1</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  title: {
      fontSize: 24,
      marginBottom: 20,
  },
  buttonStyle: {
      backgroundColor: '#28a745',
      padding: 15,
  },
  textStyle: {
      fontSize: 18,
      fontWeight: 'bold',
  },
});

export default profilesScreen