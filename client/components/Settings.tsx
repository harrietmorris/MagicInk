import { Text, Pressable, TextInput, View } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { useDataContext } from '../context/globalContext';
import { router } from 'expo-router'
import { ProfileType } from '../types';
import { deleteProfile, updateProfile } from '@/services/apiService';
import { readingLevelOptions } from '@/constants/readingLevels';


const Settings = () => {
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
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Profile name:</Text>
        <TextInput
          placeholder={profileName}
          value={profileName}
          onChangeText={setProfileName}
          />
      </View>
      <View style={styles.container2}>
        <Pressable style={styles.button} onPress={handleUpdateName}>
          <Text style={styles.buttonText}>Update name</Text>
        </Pressable>

        <Text style={styles.title}>Choose reading level: {selectedProfile?.readingLevel}</Text>
        <Picker
          selectedValue={selectedProfile?.readingLevel}
          style={styles.picker}
          onValueChange={handleReadingLevelChange}
        >
        {Object.keys(readingLevelOptions).map((level) => (
          <Picker.Item key={level} label={`${level}`} value={level} />  
        ))}
        </Picker>

        <Pressable style={styles.button} onPress={handleDeleteProfile}>
          <Text style={styles.buttonText}>Delete profile</Text>
        </Pressable>

        <Text style={styles.title}>Email: {user?.email}</Text>

        <Pressable style={styles.button} onPress={handleNewProfile}>
          <Text style={styles.buttonText}>Create new profile</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    maxHeight: 80,
  },
  container2: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
  picker: {
    height: 50,
    width: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
})

export default Settings