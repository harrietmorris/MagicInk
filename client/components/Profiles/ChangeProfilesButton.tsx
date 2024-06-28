import { View, Text, Pressable, StyleSheet, Modal, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { useDataContext } from '@/context/globalContext';
import { ProfileType } from '@/types';
import ProfileButton from './ProfileButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSelectedProfile } from '@/services/apiService';

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
      <SafeAreaView>
        <Pressable style={styles.circleButton} onPress={() => setModalVisible(true)}>
          {selectedProfile ? (
            selectedProfile.picture ? (
              <Image source={{ uri: selectedProfile.picture }} style={styles.profileImage} />
            ) : (
              <Text style={styles.profileInitial}>{selectedProfile.name.charAt(0).toUpperCase()}</Text>
            )
          ) : (
            <Text style={styles.circleButtonText}>+</Text>
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
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  circleButton: {
    backgroundColor: '#28a745',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  profileInitial: {
    color: '#fff',
    fontSize: 24,
  },
  circleButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  profileButton: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    width: 200,
    borderRadius: 5,
  },
  profileButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ChangeProfilesButton;
