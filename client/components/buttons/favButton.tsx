import { Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDataContext } from '@/context/globalContext';
import { ProfileType, StoryType } from '@/types';
import { addToFavs, removeFromFavs } from '@/services/apiService';

interface FavButtonProps {
    storyId: number;
  }

const FavButton: React.FC<FavButtonProps> =  ({storyId}) => {
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


    // const isFav = selectedProfile.favs.some(fav => fav.id === storyId);

    // const toggleFavorite = () => {
    //     const updatedFav = isFav
    //         ? selectedProfile.favs.filter(story => story.id !== storyId)
    //         : [...selectedProfile.favs, { id: storyId } as StoryType]; 

    //     setSelectedProfile({ ...selectedProfile, favs: updatedFav });
    // };


    return (
        <Pressable
        style={[styles.button, isFav ? styles.fav : styles.notFav]}
        onPress={toggleFav}
        >
        <Text style={styles.buttonText}>{isFav ? 'Unfav' : 'Fav'}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      elevation: 3,
    },
    fav: {
      backgroundColor: '#ff0000',
    },
    notFav: {
      backgroundColor: '#007BFF',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
  });
  
  export default FavButton;