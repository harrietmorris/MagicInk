import { View, Text, Button, Picker, TextInput } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { useDataContext } from '../../context/globalContext';
import { router } from 'expo-router'
import { ProfileType } from '../../types';
import { deleteProfile, updateProfile } from '@/services/apiService';
import { readingLevelOptions } from '@/constants';


const settingsScreen = () => {
  const { user, profiles, setProfiles, selectedProfile, setSelectedProfile } = useDataContext();
  const [profileName, setProfileName] = useState(selectedProfile?.name);

  async function handleProfileUpdate(prop: string, value: string) {
    if (!selectedProfile) return; // TODO: we should always have a selected profile?
    const newProfile = {
      ...selectedProfile,
      [prop]: value,
    };
    try {
      await updateProfile(newProfile);
      setSelectedProfile(newProfile);
      setProfiles(profiles.map((profile: ProfileType) => profile.id === newProfile.id ? newProfile : profile));
    
    } catch (error) {
      console.error('Error updating profile', error);
    }
  }

  async function handleReadingLevelChange (readingLevel: string) {
    handleProfileUpdate('readingLevel', readingLevel);
  }

  async function handleUpdateName () {
    handleProfileUpdate('name', profileName || '');
  }
    

  function handleLogout () {
    // TODO: Implement logout logic
    router.replace('/loginScreen');
  }

  function handleNewProfile () {
    router.replace('/newProfileScreen');
  }

  async function handleDeleteProfile () {
    if (profiles.length === 1) {
      alert('You must have at least one profile');
      return;
    }
    if (!selectedProfile) return; // TODO: we should always have a selected profile?
    const id = selectedProfile.id;
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
      <Text style={styles.title}>Profile name:</Text>
      <TextInput
        placeholder={profileName}
        value={profileName}
        onChangeText={setProfileName}
      />
      <Button title='Update name' onPress={handleUpdateName}/>

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