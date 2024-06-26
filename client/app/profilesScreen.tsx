import { StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import NewProfileButton from '../components/Profiles/NewProfileButton'
import ListedProfiles from '@/components/Profiles/ListedProfiles'

const profilesScreen = () => {


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