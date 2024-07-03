import React, { useState } from 'react';
import { Modal, View, Text, Pressable, ActivityIndicator } from 'react-native';
// import { getStorage } from 'firebase/storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import pickAndUploadImage from '../utils/PickUploadImg';
import ImageChoice from './ImageChoice'; 
import { storage } from '@/firebaseConfig';
// import { firebaseConfig } from '../../firebaseConfig';
// import { initializeApp } from 'firebase/app';


// initializeApp(firebaseConfig);
// const storage = getStorage();

interface ChangeImgModalProps {
  visible: boolean;
  onClose: () => void;
  onImageUpload: (imageUrl: string) => void;
}

const ChangeImgModal = ({ visible, onClose, onImageUpload }: ChangeImgModalProps) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageChoiceVisible, setImageChoiceVisible] = useState(false);

  const handleChooseImage = () => {
    setImageChoiceVisible(true);
  };

  const handleUploadImage = async () => {
    pickAndUploadImage(storage, setUploading, onImageUpload);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/80">
        <View className="w-4/5 bg-blue p-5 rounded-lg">
          <Pressable className="absolute top-2 right-2" onPress={onClose}>
            <Ionicons name="close" size={24} color="white" />
          </Pressable>
          <Text className="mb-5 text-2xl font-bold text-white p-2">Choose an option</Text>
          <View className="flex-row justify-center">
            <Pressable className="bg-grey rounded-md py-2 px-4 m-2" onPress={handleChooseImage} disabled={uploading}>
              <Text className="text-white font-semibold text-lg text-center">Choose</Text>
            </Pressable>
            <Pressable className="bg-grey rounded-md py-2 px-4 m-2" onPress={handleUploadImage} disabled={uploading}>
              <Text className="text-white font-semibold text-lg text-center">{uploading ? <ActivityIndicator color="#fff" /> : 'Upload'}</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {imageChoiceVisible && (
        <ImageChoice
          imgVisible={true} 
          currentImg={''}
          onClose={() => setImageChoiceVisible(false)}
          onSave={onImageUpload} 
        />
      )}
    </Modal>
  );
};

export default ChangeImgModal;
