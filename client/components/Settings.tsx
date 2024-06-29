import { Text, Pressable, View, Image } from 'react-native';
import React, { useState } from 'react';
import { useDataContext } from '../context/globalContext';
import { router } from 'expo-router';
import { ProfileType } from '../types';
import { deleteProfile, updateProfile } from '@/services/apiService';
import BlueButton from './style/BlueButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import PopUp from './utils/PopUp';
import ReadingLevelPicker from './utils/ReadingLevelPicker';
import NameEdit from './utils/NameEdit';
import { profilePictures } from '../constants/profilePictures';
import ImageChoice from './utils/ImageChoice';

const Settings = () => {
  const { user, profiles, setProfiles, selectedProfile, setSelectedProfile } = useDataContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [imgModalVisible, setImgModalVisible] = useState(false); 

  async function handleProfileUpdate(prop: string, value: string) {
    if (!selectedProfile) return; // TODO: we should always have a selected profile?
    const newProfile = {
      ...selectedProfile,
      [prop]: value,
    };
    
    try {
      const profileToDb = { ...newProfile };
      delete profileToDb['storiesList'];
      delete profileToDb['favs'];
      await updateProfile(profileToDb);
      setSelectedProfile(newProfile);
      setProfiles(profiles.map((profile: ProfileType) => (profile.id === newProfile.id ? newProfile : profile)));
    } catch (error) {
      console.error('Error updating profile', error);
    }
  }

  async function handleReadingLevelChange(readingLevel: string) {
    handleProfileUpdate('readingLevel', readingLevel);
  }

  const handleUpdateName = (newName: string) => {
    handleProfileUpdate('name', newName);
  };

  const handleImageUpdate = (newImg: string) => {
    handleProfileUpdate('picture', newImg);
  }

  function handleNewProfile() {
    router.replace('/newProfileScreen');
  }

  async function handleDeleteProfile() {
    if (profiles.length === 1) {
      alert('You must have at least one profile');
      return;
    }
    if (!selectedProfile) return; // TODO: we should always have a selected profile?
    const id = selectedProfile.id;
    try {
      await deleteProfile(id);
      const newProfiles = profiles.filter((profile: ProfileType) => profile.id !== id);
      setProfiles(newProfiles);
      setSelectedProfile(newProfiles[0]);
      router.replace('/profilesScreen');
    } catch (error) {
      console.error('Error deleting profile', error);
    }
  }

  return (
    <>
       <View className='flex flex-row items-center justify-center'>
        <Pressable onPress={() => setImgModalVisible(true)}>
          <Image
            source={profilePictures.find(item => item.id === selectedProfile?.picture)?.src}
          />
        </Pressable>
      </View>

       <ImageChoice
        imgVisible={imgModalVisible}
        currentImg={selectedProfile?.picture || ''}
        onClose={() => setImgModalVisible(false)}
        onSave={handleImageUpdate}
      />

      <View className='flex flex-row items-center justify-center'>
        <Text className='text-white text-5xl' numberOfLines={1} adjustsFontSizeToFit={true}>
          {selectedProfile?.name}{' '}
        </Text>
        <Pressable onPress={() => setNameModalVisible(true)}>
          <FontAwesome name='pencil' size={30} color='white' />
        </Pressable>
      </View>

      <NameEdit
        visible={nameModalVisible}
        currentName={selectedProfile?.name || ''}
        onClose={() => setNameModalVisible(false)}
        onSave={handleUpdateName}
      />

      <View className='w-full items-center'>
        <Text className='text-white text-2xl self-start mb-4'>Username</Text>
        <View className='bg-grey w-full rounded-full px-6 py-4'>
          <Text className='text-white text-2xl'>{user?.email} </Text>
        </View>
      </View>

      <View className='w-full items-center text-white '>
        <Text className='text-white text-2xl self-start mb-4'>Update Reading Level</Text>
        <ReadingLevelPicker selectedValue={selectedProfile?.readingLevel} onValueChange={handleReadingLevelChange} />
      </View>

      <View className='flex flex-row items-center justify-center'>
        <BlueButton title='+ New Profile' onPress={handleNewProfile} />
      </View>

      <Pressable onPress={() => setModalVisible(true)} className='self-end'>
        <Ionicons name='trash-outline' size={40} color='#FFFFFF' />
      </Pressable>

      <PopUp
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onConfirm={handleDeleteProfile}
        message='Are you sure you want to delete this profile?'
      />
    </>
  );
};

export default Settings;

