import { Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDataContext } from '@/context/globalContext';
import { ProfileType, StoryType } from '@/types';
import { addToFavs, removeFromFavs } from '@/services/apiService';
import { AntDesign } from '@expo/vector-icons';

interface FavButtonProps {
  storyId: number;
}

const FavButton: React.FC<FavButtonProps> = ({ storyId }) => {
  const { setSelectedProfile, selectedProfile } = useDataContext();

  const isFav = selectedProfile?.favs?.some((fav) => fav.id === storyId)


  const toggleFav = async () => {
    try {

      let updatedProfile: ProfileType | undefined;
      if (isFav) {
        updatedProfile = await removeFromFavs(selectedProfile!.id, storyId);
      } else {
        updatedProfile = await addToFavs(selectedProfile!.id, storyId);
      }
      console.log(updatedProfile.favs.map(fav => fav.id))
      setSelectedProfile((prevProfile) => ({
        ...prevProfile!,
        favs: updatedProfile!.favs,
      }));

    } catch (error) {
      console.error('Error toggling favorite', error);
    }
  };

  return (
    <Pressable onPress={toggleFav}>
      {isFav ? <AntDesign name="heart" size={24} color="red" /> :<AntDesign name="hearto" size={24} color="red" /> }
    </Pressable>
  );
};


export default FavButton;