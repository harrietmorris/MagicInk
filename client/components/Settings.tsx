import { Text, Pressable, TextInput, View, FlatList, TouchableOpacity, Image } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import React, { useState } from 'react'
import { useDataContext } from '../context/globalContext';
import { router } from 'expo-router'
import { ProfileType } from '../types';
import { deleteProfile, updateProfile } from '@/services/apiService';
import BlueButton from './style/BlueButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { } from 'react-native';
import { profilePictures } from '@/constants/profilePictures';
import PopUp from './PopUp';
import ReadingLevelPicker from './utils/ReadingLevelPicker';

const Settings = () => {
  const { user, profiles, setProfiles, selectedProfile, setSelectedProfile } = useDataContext();
  const [profileName, setProfileName] = useState(selectedProfile?.name);
  const [selectedImageId, setSelectedImageId] = useState(selectedProfile?.picture || '1');
  const [modalVisible, setModalVisible] = useState(false);

  async function handleProfileUpdate(prop: string, value: string) {
    if (!selectedProfile) return; // TODO: we should always have a selected profile?
    const newProfile = {
      ...selectedProfile,
      [prop]: value
    };
    delete newProfile['favs'];
    delete newProfile['storiesList'];
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
      router.replace('/profilesScreen')
    } catch (error) {
      console.error('Error deleting profile', error);
    }
  }



  return (
    <>
      <View>
        <FlatList
          data={profilePictures}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          horizontal={true}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={async () => {
                handleProfileUpdate('picture', item.id);
                setSelectedImageId(item.id);
              }}>
              <Image
                source={item.src}
                className={`m-2 rounded-lg ${selectedImageId === item.id ? 'w-[100px] h-[100px]' : 'w-[90px] h-[90px]'}`} 
                />
            </TouchableOpacity>
          )}
          />
      </View>

      <View>
        <TextInput 
        placeholder={profileName}
        value={profileName}
        onChangeText={setProfileName}
        className='text-white text-5xl'
        />
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
          <ReadingLevelPicker
          selectedValue={selectedProfile?.readingLevel}
          onValueChange={handleReadingLevelChange}
        />
      </View>
      
        <BlueButton title="+ New Profile" onPress={handleNewProfile}/>

        <Pressable onPress={() => setModalVisible(true)} className='self-end'>
          <Ionicons name="trash-outline" size={40} color="#FFFFFF" />
        </Pressable>
      
        <PopUp
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onConfirm={handleDeleteProfile}
        message="Are you sure you want to delete this profile?"
      />
      
    </>
  )
}

export default Settings