import { Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useDataContext } from '@/context/globalContext';
import { StoryType } from '@/types';

interface FavButtonProps {
    storyId: number;
  }

const FavButton: React.FC<FavButtonProps> =  ({storyId}) => {
    const { setSelectedProfile, selectedProfile } = useDataContext();

    if (!selectedProfile) {
        return null; 
    }

    if (!selectedProfile.favs) {
        setSelectedProfile({ ...selectedProfile, favs: [] });
        return null;
    }

    const isFav = selectedProfile.favs.some(fav => fav.id === storyId);

    const toggleFavorite = () => {
        const updatedFav = isFav
            ? selectedProfile.favs.filter(story => story.id !== storyId)
            : [...selectedProfile.favs, { id: storyId } as StoryType]; 

        setSelectedProfile({ ...selectedProfile, favs: updatedFav });
    };

    return (
        <Pressable
        style={[styles.button, isFav ? styles.fav : styles.notFav]}
        onPress={toggleFavorite}
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