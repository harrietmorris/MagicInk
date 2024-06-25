import { View, Text, StyleSheet, SafeAreaView} from 'react-native'
import React, { useEffect } from 'react'
import { Link, router } from 'expo-router'
import NewProfileButton from '../components/Profiles/NewProfileButton'
import { useDataContext } from '@/context/globalContext'
import { getUser } from '@/services/apiService'
import ListedProfiles from '@/components/Profiles/ListedProfiles'




const profilesScreen = () => {
  const { setUser  } = useDataContext();
 
  useEffect(() => {
    const fetchUser = async () => {
      const userId = 1; // Replace with dynamic once login is working correctly
      const userData =  await getUser(userId);
      setUser( userData);
    };

    fetchUser();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      < NewProfileButton 
        route="/newProfileScreen"
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textStyle} />
      
      <ListedProfiles />


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