import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useDataContext } from '@/context/globalContext';
import { getAllProfiles } from '@/services/apiService';
import ProfileButton from './ProfileButton';
import { ProfileType } from '@/types';


const ListedProfiles = () => {
    // const dataContext = useDataContext();
    // if (!dataContext) return null;
    const { user, profiles, setProfiles, setSelectedProfile } = useDataContext();;


    useEffect(()=> {
        const getProfiles = async () => {
            if (user) {
              const profiles = await getAllProfiles(user.id);
              setProfiles(profiles);
            }
        }

        getProfiles();
    }, [user]);

    const handleProfilePress = (profile: ProfileType) => {
        setSelectedProfile(profile);
      };


  return (
    <FlatList
    data={profiles}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <ProfileButton
        profileName={item.name}
        route="/homeScreen"
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textStyle}
        onPress={() => handleProfilePress(item)}
      />
    )}
  />
  )
}

const styles = StyleSheet.create({
    buttonStyle: {
      backgroundColor: '#28a745',
      padding: 15,
      marginVertical: 5,
    },
    textStyle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default ListedProfiles