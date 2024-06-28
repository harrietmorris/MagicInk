import { View, Text, Pressable, StyleSheet, Modal, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { useDataContext } from '@/context/globalContext';
import { ProfileType } from '@/types';
import ProfileButton from './ProfileButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSelectedProfile } from '@/services/apiService';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const ChangeProfilesButton = () => {
  const { profiles, selectedProfile, setSelectedProfile, setSelectedStory } = useDataContext();
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
          <View style={styles.modalContainer}>
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

const styles = StyleSheet.create({
  // circleButton: {
  //   backgroundColor: '#28a745',
  //   borderRadius: 50,
  //   width: 50,
  //   height: 50,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // profileImage: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 50,
  // },
  // profileInitial: {
  //   color: '#fff',
  //   fontSize: 24,
  // },
  // circleButtonText: {
  //   color: '#fff',
  //   fontSize: 24,
  // },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  // profileButton: {
  //   backgroundColor: '#fff',
  //   padding: 15,
  //   marginVertical: 5,
  //   width: 200,
  //   borderRadius: 5,
  // },
  // profileButtonText: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   color: '#000',
  // },
});

export default ChangeProfilesButton;
