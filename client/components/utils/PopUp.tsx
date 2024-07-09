import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'

interface PopUpProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm: () => void;
    message: string;
  }
  
  const PopUp = ({ modalVisible, setModalVisible, onConfirm, message }: PopUpProps) => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View className='flex-1 justify-center items-center bg-[#000000]/[0.8]'>
          <View className='bg-blue rounded-lg p-5 w-80'>
            <Text className='text-center text-white text-lg mb-4'>{message}</Text>
            <View className='flex-row justify-center'>
              <Pressable
                className='bg-grey rounded-md py-2 px-4 m-2'
                onPress={() => {
                  setModalVisible(!modalVisible);
                  onConfirm();
                }}
              >
                <Text className='text-white font-semibold text-lg'>Yes</Text>
              </Pressable>
              <Pressable
                className='bg-grey rounded-md py-2 px-4 m-2'
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className='text-white font-semibold text-lg'>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  
  
  export default PopUp;