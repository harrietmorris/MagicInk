import { Text, Pressable, TextInput, View } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { useDataContext } from '../context/globalContext';
import { router } from 'expo-router'
import { ProfileType } from '../types';
import { deleteProfile, updateProfile } from '@/services/apiService';
import { readingLevelOptions } from '@/constants/readingLevels';
import BlueButton from './style/BlueButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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

      <FontAwesome6 name="face-grin-tongue" size={150} color="#91EE91" />


      {/* TODO: change so that name is normal text, and on pencil click we get a popup to change name  */}
      <View style={styles.container} >
        <TextInput 
          placeholder={profileName}
          value={profileName}
          onChangeText={setProfileName}
          className='text-white text-5xl'
          />
          <Text>   </Text>
        <Pressable onPress={handleUpdateName}><FontAwesome name="pencil" size={30} color="white" /></Pressable>
      </View>

     
        <View className='w-full items-center' >
          <Text className='text-white text-2xl self-start'>Username</Text>
          <View className='bg-grey w-full rounded-full px-4 py-2 '>
            <Text className='text-white text-2xl'>{user?.email} </Text>
          </View>
        </View>
      

        <View className='w-full items-center text-white'>
        <Text className='text-white text-2xl self-start'>Update Reading Level</Text>
        <View className='bg-grey w-full rounded-full px-4 py-2 border border-green text-white'> 
          <Picker
            className='w-full text-white grey'
            selectedValue={selectedProfile?.readingLevel}
            onValueChange={handleReadingLevelChange}
            dropdownIconColor='#ffffff'      
            selectionColor='#ffffff'      
          >
            {Object.keys(readingLevelOptions).map((level) => (
              <Picker.Item key={level} label={`${level}`} value={level} style={{backgroundColor : "#333333", color: '#ffffff'}} />  
            ))}
          </Picker>
        </View>
        </View>

      
        <BlueButton title="+ New Profile" onPress={handleNewProfile}/>

          
        <Pressable onPress={handleDeleteProfile} className='self-end'>
          <Ionicons name="trash-outline" size={40} color="#FFFFFF" />
        </Pressable>
     
      
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

})

export default Settings