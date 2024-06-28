import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useDataContext } from '@/context/globalContext';
import { ProfileType } from '@/types';
import { removeStoryFromProfile } from '@/services/apiService';

interface DeleteStoryProps {
  storyId: number;
}

const DeleteStoryBtn = ({ storyId }: DeleteStoryProps): React.JSX.Element => {
  const { setSelectedProfile, selectedProfile } = useDataContext();

  const handleDelete = async () => {
    const updatedStorylist = selectedProfile?.storiesList?.filter((story) => story.id !== storyId);
    const updatedProfile = { ...selectedProfile, storiesList: updatedStorylist };
    await removeStoryFromProfile(selectedProfile.id, storyId);
    setSelectedProfile(updatedProfile);
  };

  return (
    <View>
      <Pressable onPress={handleDelete}>
        <FontAwesome size={24} name='trash' color='#FFFFFF' />
      </Pressable>
    </View>
  );
};

export default DeleteStoryBtn;
