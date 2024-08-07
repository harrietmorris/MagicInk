import { View, Pressable, Modal, FlatList } from 'react-native';
import React, { useRef, useState } from 'react';
import { useDataContext } from '@/context/globalContext';
import { ProfileType } from '@/types';
import { getSelectedProfile } from '@/services/apiService';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import DropButton from './DropButton';
import RenderImage from './RenderImg'; 

const ChangeProfilesButton = () => {
  const { profiles, selectedProfile, setSelectedProfile, setSelectedStory } = useDataContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonLayout, setButtonLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const buttonRef = useRef<View>(null);

  const handleProfilePress = async (profile: ProfileType) => {
    try {
      const profileId = profile.id;
      const fetchedProfile = await getSelectedProfile(profileId);
      setSelectedProfile(fetchedProfile);
      setSelectedStory(null);
      setModalVisible(false);
    } catch (error) {
      console.error('Error fetching profile', error);
    }
  };

  const handlePressIn = () => {
    buttonRef.current?.measure((width, height, py) => {
      setButtonLayout({ x: width, y: py, width, height });
      setModalVisible(true);
    });
  };

 
  return (
    <View className='px-2.5'>
      <Pressable ref={buttonRef} onPressIn={handlePressIn}>
        {selectedProfile ? (
          selectedProfile.picture ? (
            <RenderImage
              imageUrl={selectedProfile!.picture}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
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
        <Pressable className='flex flex-col justify-start items-center h-screen' onPress={() => setModalVisible(false)}>
          <View
            className="absolute bg-dark-grey dark:bg-grey rounded w-60 opacity-90"
            style={{ top: buttonLayout.y + buttonLayout.height, right: buttonLayout.x }}
          >
            <FlatList
              ItemSeparatorComponent={() => <View className='border-b-2 border-grey dark:border-dark-grey' />}
              data={profiles}
              className='divide-x-2 divide-white'
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <DropButton
                  profileName={item.name}
                  profilePic={item.picture || ''}
                  onPress={() => handleProfilePress(item)}
                  route={'/homeScreen'}
                />
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ChangeProfilesButton;
