import { View, Text, Button, Picker } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { useDataContext } from '../../context/globalContext';
import { router } from 'expo-router'
import { ProfileType } from '../../types';
import { deleteProfile, updateProfile } from '@/services/apiService';
import { readingLevelOptions } from '@/constants';


const settingsScreen = () => {
  const { user, profiles, setProfiles, selectedProfile, setSelectedProfile } = useDataContext();

  async function handleReadingLevelChange (readingLevel: string) {
    if (!selectedProfile) return; // TODO: we should always have a selected profile?
    const newProfile = {
      ...selectedProfile,
      readingLevel,
    };
    await updateProfile(newProfile);
    setSelectedProfile(newProfile);
    setProfiles(profiles.map((profile: ProfileType) => profile.id === newProfile.id ? newProfile : profile));
  }
    

  function handleLogout () {
    // TODO: Implement logout logic
    router.replace('/loginScreen');
  }

  function handleNewProfile () {
    // TODO: Implement new profile logic
    router.replace('/newProfileScreen');
  }

  async function handleDeleteProfile () {
    if (profiles.length === 1) {
      alert('You must have at least one profile');
      return;
    }
    if (!selectedProfile) return; // TODO: we should always have a selected profile?
    const id = selectedProfile.id;
    // TODO: delete profile logic (delete from db)
    try {
      await deleteProfile(id);
      const newProfiles = profiles.filter( (profile: ProfileType) => profile.id !== id);
      setProfiles(newProfiles);
      setSelectedProfile(newProfiles[0]);
    } catch (error) {
      console.error('Error deleting profile', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile name: {selectedProfile?.name}</Text>

      <Text style={styles.title}>Choose reading level: {selectedProfile?.readingLevel}</Text>
      <Picker
        selectedValue={selectedProfile?.readingLevel}
        style={styles.picker}
        onValueChange={handleReadingLevelChange}
      >
      {Object.keys(readingLevelOptions).map((readingLevel) => (
        <Picker.Item key={readingLevel} label={readingLevel} value={readingLevelOptions[readingLevel]} />  
      ))}
      </Picker>

      <Button title='Delete profile' onPress={handleDeleteProfile}/>
      <Text style={styles.title}>Email: {user?.email}</Text>
      <Button title='Create new profile' onPress={handleNewProfile}/>
      <Button title='Logout' onPress={handleLogout}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 20,
    // margin: 20,
  },
  picker: {
    height: 50,
    width: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default settingsScreen