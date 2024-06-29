import { View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useDataContext } from '@/context/globalContext';
import { removeStoryFromProfile } from '@/services/apiService';
import PopUp from '../PopUp';
import { router } from 'expo-router';

interface DeleteStoryProps {
  storyId: number;
}

const DeleteStoryBtn = ({ storyId }: DeleteStoryProps): React.JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);

  const { setSelectedProfile, selectedProfile } = useDataContext();

  const handleDelete = async () => {
    const updatedStorylist = selectedProfile?.storiesList?.filter((story) => story.id !== storyId);
    const updatedProfile = { ...selectedProfile, storiesList: updatedStorylist };
    try {
      await removeStoryFromProfile(selectedProfile.id, storyId);
      setSelectedProfile(updatedProfile);
      router.replace('/homeScreen');
    } catch (error) {
      console.log('Error deleting story from profile:', error)
    }
  };

  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)}>
        <FontAwesome size={24} name='trash' color='#FFFFFF' />
      </Pressable>
      <PopUp
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onConfirm={handleDelete}
        message='Are you sure you want to delete this story from your profile?'
      />
    </View>
  );
};

export default DeleteStoryBtn;
