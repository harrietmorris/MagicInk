import React, { useState } from 'react';
import { Modal, View, Text, Pressable, FlatList } from 'react-native';
import { profilePictures } from '../../constants/profilePictures'; 
import { useDataContext } from '@/context/globalContext';
import { Image } from 'expo-image';

interface ImageChoiceProps {
    imgVisible: boolean;
    currentImg: string;
    onClose: () => void;
    onSave: (newImg: string) => void;
  }
  
const ImageChoice = ({ imgVisible, currentImg, onClose, onSave} : ImageChoiceProps) => {
    const { selectedProfile } = useDataContext();
    const [newImg, setNewImg] = useState(currentImg);
    const [selectedImageId, setSelectedImageId] = useState(selectedProfile?.picture || '1');

    const handleSave = () => {
      console.log('handle save ImageChoice', newImg)
        onSave(newImg);
        onClose();
    };
  
    return (
        <Modal visible={imgVisible} transparent={true} animationType="slide">

        <View className='flex-1 justify-center items-center bg-[#000000]/[0.8]'>
        <View className='w-4/5 bg-blue p-5 rounded-lg'>
          <Text  className="mb-5 text-2xl font-bold text-white p-2">Select Profile Picture</Text>
          <FlatList
             data={profilePictures}
             keyExtractor={(item) => item.id.toString()}
             numColumns={1}
             horizontal={true}
             renderItem={({ item }) => (
              <Pressable
                className='flex-row items-center mb-10'
                onPress={() => {
                  setNewImg(item.id);
                  setSelectedImageId(item.id);
                }}
              >
                <Image
                  source= {item.src}
                  className={`m-2 rounded-lg ${
                    selectedImageId === item.id ? 'w-[100px] h-[100px]' : 'w-[90px] h-[90px]'
                  }`}
                />
            
              </Pressable>
            )}
          />
          <View className='flex-row justify-center'>
              <Pressable className='bg-grey rounded-md py-2 px-4 m-2 w-28' onPress={onClose}>
              <Text className='text-white font-semibold text-lg text-center'>Cancel</Text>
            </Pressable>
              <Pressable className='bg-grey rounded-md py-2 px-4 m-2 w-28' onPress={handleSave}>
                <Text className='text-white font-semibold text-lg text-center'>Save</Text>
              </Pressable>
            </View>
         
        </View>
      </View>
    </Modal>
  );
};

export default ImageChoice;