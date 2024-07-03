import { Text, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { useDataContext } from '@/context/globalContext';
import { getAllProfiles } from '@/services/apiService';
import ProfileButton from './ProfileButton';
import { ProfileType } from '@/types';

const ListedProfiles = () => {
  const { user, profiles, setProfiles, setSelectedProfile } = useDataContext();

  useEffect(() => {
    const getProfiles = async () => {
      if (user) {
        const profiles = await getAllProfiles(user.id);
        setProfiles(profiles);
      }
    };

    getProfiles();
  }, [user]);

  const handleProfilePress = (profile: ProfileType) => {
    setSelectedProfile(profile);
  };

  if (!user) {
    return <Text>Loading user data...</Text>;
  }

  if (!profiles || profiles.length === 0) {
    return <Text>No profiles available, please create new profile.</Text>;
  }
  
  const colorList = ['#4682B4', '#91EE91', '#F4A662', '#F0E68F', '#4682B4', '#91EE91', '#F4A662', '#F0E68F']
  return (
    <FlatList
      data={profiles}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <ProfileButton profileName={item.name} itemColour={colorList[index]} profileImg={item!.picture} route='/homeScreen' onPress={() => handleProfilePress(item)} />
      )}
    />
  );
};

export default ListedProfiles;
