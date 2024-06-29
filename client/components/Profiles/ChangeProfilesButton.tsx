import { View, Pressable, Modal, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { useDataContext } from '@/context/globalContext';
import { ProfileType } from '@/types';
import ProfileButton from './ProfileButton';
import { getSelectedProfile } from '@/services/apiService';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const ChangeProfilesButton = () => {
  const { profiles, selectedProfile, setSelectedProfile } = useDataContext();
  const [modalVisible, setModalVisible] = useState(false);


    const handleProfilePress = async (profile: ProfileType) => {
      try {
        let profileId = profile.id;
        const fetchedProfile = await getSelectedProfile(profileId);
        setSelectedProfile(fetchedProfile);
        setModalVisible(false);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    return (
      <View >
        <Pressable className='' onPress={() => setModalVisible(true)}>
          {selectedProfile ? (
            selectedProfile.picture ? (
              <Image source={{ uri: selectedProfile.picture }}/>
            ) : (
              <FontAwesome6 name="face-grin-tongue" size={30} color="#91EE91" />
            )
          ) : (
            <FontAwesome6 name="face-grin-tongue" size={30} color="#91EE91" />
          )}
        </Pressable>
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType='fade'
          onRequestClose={() => setModalVisible(false)}
        >
          <View>
            <FlatList
              data={profiles}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ProfileButton
                  profileName={item.name}
                  onPress={() => handleProfilePress(item)}
                  route={'/homeScreen'}
                />
              )}
            />
          </View>
        </Modal>
      </View>
    );
  };


export default ChangeProfilesButton;
